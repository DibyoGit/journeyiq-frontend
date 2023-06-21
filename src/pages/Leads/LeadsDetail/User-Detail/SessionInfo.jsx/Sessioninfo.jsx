import Card from "../../../../../component/sharedComponent/Card/Card"
import { FcApproval, FcCancel } from 'react-icons/fc'
import { AiOutlineClockCircle, AiOutlineDesktop, AiOutlineDown, AiFillEye } from "react-icons/ai";
import { IoIosArrowDown } from 'react-icons/io'
import moment from "moment";
import { DemoPie } from "./DemoPie";
import { DemoBar } from "./DemoBar";
import DataTable, { createTheme } from "react-data-table-component";
import { useState } from "react";
import styles from '../../../../../global.module.scss'
import { EventInfo } from "../../../../../component/Modals/EventIfo/EventInfo";
import { durationOptions } from "../../../../../Statics/LeadsOptions";
import SelectionFilter from "../../../../../component/sharedComponent/SelectionFilter";
import { useEffect } from "react";
import { Collapser } from "../../../../../component/sharedComponent/Collapser";
import { Select } from "antd";

createTheme('default', {
    text: {
        fontSize: "24px"
    }
})

const customStyles = {
    rows: {
        style: {
        },
    },
    headCells: {
        style: {
            padding: '8px',
            backgroundColor: "#0e5ba9",
            color: 'white',
            borderRadius: 'none',
            textAlign: 'center',
        },
    },
    cells: {
        style: {
            padding: '8px',
            paddingLeft: "12px",
            textAlign: 'center',
        },
    },
};

export const SessionInfo = ({ sessionData }) => {
    let c1 = "rgb(224 242 254)";
    let c2 = "rgb(186 230 253)";
    const data = sessionData?.Navigation || []
    const [modal, setModal] = useState();
    const [close, setClose] = useState(true)
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const [dateSelection, setdateSelection] = useState(durationOptions[durationOptions.length - 1].value)
    const [filterData, setFilterData] = useState([]);
    const [clubbed, setClubbedData] = useState([])

    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    }

    function ModalHandler(data) {
        setModal(<EventInfo setClose={setClose} data={data} />)
        setClose(false)
    }

    const columns = [

        {
            name: 'Start Time',
            selector: row => row.loadTime?.split(',')[1],
            center: true
        },
        {
            name: 'End Time',
            selector: row => row.unloadTime?.split(',')[1],
        },
        {
            name: 'Vistied Page',

            selector: row => row.baseURI != null ? (row.baseURI.replace('https://test-ecommerce-app.herokuapp.com/', "") !== "" ? row.baseURI.replace('https://test-ecommerce-app.herokuapp.com/', "") : "Home") : "End",
        },
        {
            name: 'Previous Page',
            selector: row => row.prevPage != null ? (row.prevPage.replace('https://test-ecommerce-app.herokuapp.com/', "") !== "" ? row.prevPage.replace('https://test-ecommerce-app.herokuapp.com/', "") : "Home") : "Direct",
            center: true
        },
        {
            name: 'Events',
            button: true,
            cell: row => {
                
            return  <button onClick={() => row?.event?.length > 0 ? ModalHandler(row?.event):""} className='shadow rounded text-white  bg-[#0e5ba9] p-6 pt-1 pb-1' title="See more"   >{row.event?.length}</button>}
        }

    ];


    function FilterData() {
        let currUS = new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' })
        const m = new moment(currUS)
        let we = m.subtract(7, 'days');
        let mo = m.subtract(30, 'days');
        let ye = m.subtract(1, 'days');
        const filtData = data.filter(data => {
            const bef = data?.loadTime;
            const aft = we;
            if (dateSelection === 'week') {
                return (new Date(bef) - new Date(aft) > 0)
            }
            else if (dateSelection === 'today') {
                return new moment(bef).format("YYYY-MM-DD") === new moment(currUS).format("YYYY-MM-DD")
            }
            else if (dateSelection === 'yesterday') {

                return new moment(bef).format("YYYY-MM-DD ") === new moment(currUS).subtract(1, 'days').format("YYYY-MM-DD ")
            }
            else if (dateSelection === 'month') {
                return (new Date(bef) - new Date(mo) > 0)
            }
            else if (dateSelection === '') {

                return true;
            }
        })
        return filtData

    }

    useEffect(() => {

        setFilterData(FilterData())
    }, [dateSelection, data])

    const Sessions = [];

    useEffect(() => {

        const groupByCategory = filterData.reduce((group, product) => {
            const { sessionID } = product;
            group[sessionID] = group[sessionID] ?? [];
            group[sessionID].push(product);
            return group;
        }, {});
        setClubbedData(groupByCategory)
        
    }, [filterData])

    function HandleSelectionChange(e) {
        setdateSelection(e)
    }

    return (
        <div >

            {
                modal && !close ?
                    <div className={styles.modalView}>
                        <div className={styles.view}>
                            {modal}
                        </div>
                    </div>
                    : ""
            }


            <div style={{ display: "flex", flexDirection: 'column', gap: "1rem" }}>
                {

                    <>
                        <Card>
                            
                            <div>

                                <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", padding: "5px", alignItems: "center", marginBottom: "10px" }}>
                                    <h2 className="">Session information</h2>
                                  
                                    <Select
                                        options={durationOptions}
                                        value={dateSelection}
                                        placeholder="Duration"

                                        style={{
                                            width: 150,
                                            fontSize: 14
                                        }}
                                        onChange={(e) => HandleSelectionChange(e)} size="large" />
                                        </div>
                                    {
                                        filterData.length > 0 ?
                                            <div style={{ fontSize: "12px", fontWeight: "light", width: "100%" }}>
                                                <div className=" flex flex-col gap-2">
                                                    {
                                                        Object.values(clubbed)?.map((data , i )=> {
                                                            let start = new moment(data[0].loadTime);

                                                            let end = new moment(data[data.length - 1].unloadTime);
                                                            let duration = parseFloat(moment.duration(end.diff(start)).as('minutes')).toFixed(2)
                                                         
                                                            return (

                                                                <Collapser duration={duration} date={data[0].loadTime} key={i}>

                                                                    <DataTable
                                                                        columns={columns}
                                                                        data={data}
                                                                        clearSelectedRows={toggledClearRows}
                                                                        customStyles={customStyles}

                                                                    />
                                                                </Collapser>
                                                            )
                                                        })

                                                    }
                                                </div>
                                            </div> :
                                            <p className="text-center p-2 pb-4">No Data found</p>


                                    }

                                </div>
                               
                        </Card>
                    
                        <DemoBar BarData={filterData || []} />
                              

                    </>


                }



            </div>
        </div>
    )
}

