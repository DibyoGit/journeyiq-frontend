import DataTable, { createTheme } from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import RingLoader from '../../component/sharedComponent/RingLoader/RingLoader';
import { IoDesktopOutline } from 'react-icons/io5'
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp, IoMdPhonePortrait } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { durationOptions, formOptions, leadsOptions, locationOptions, sortOption } from '../../Statics/LeadsOptions'
import styles from '../../global.module.scss'
import moment from 'moment';
import Card from '../../component/sharedComponent/Card/Card';
import { Button } from '../../component/sharedComponent/Button/Button';
import { Modal } from '../../component/Modals/Modal';
import { GET_ALL_FORMS, UPDATE_LEAD_STATUS } from '../../api/api';
import { sentenceCase } from 'sentence-case';
import { Collapse, Select } from 'antd';
import { MdReadMore } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { SessionInfo } from './LeadsDetail/User-Detail/SessionInfo.jsx/Sessioninfo';
import SessionDownloader from './SessionDownloader';

const { Panel } = Collapse;

function convert(date) {
  return new moment(date).format('dddd, MMMM Do YYYY')
}
let date = new Date()



createTheme('default', {
  text: {
    fontSize: "24px"
  }
})

function SessionTable({ data, loader, setUpdate }) {


  const { DomainID } = useSelector(state => state.DomainIDSetter)

  const [filterData, setFilterData] = useState(data)

  const [selectedRows, setSelectedRows] = useState(false);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState();





  const [filters, setFilters] = useState({
    lead: "Leads",
    date: "Duration",
    form: "Forms",
    country: "Location",
  })

  const [modalLoader, setModalLoader] = useState(false)

  const [allForms, setAllForms] = useState(null);


  const handleChange = ({ selectedRows, data }) => {
    setSelectedRows(selectedRows);
  };

  function UpdateLeadStatus(id, lead) {

    setModalLoader(true)


    axios.put(UPDATE_LEAD_STATUS, { sessionID: id, lead: !lead })
      .then(data => {
        setModalLoader(false)
        toast.info("Updated Successfully!", { icon: "" })
        setModal("")
        setTimeout(() => {


          setUpdate(pre => !pre)
        }, 1500);


      })
      .catch(e => {
        console.log(e)
        setModalLoader(false)
        toast.info(e?.message, { icon: "" })

      })
  }



  const ChangeLeadModal = ({ lead, id }) => {
    return (
      <Modal title="Change Lead Status" close={setModal}>

        {
          !modalLoader ?
            <>
              <p className='py-4 px-2'>Are you sure you want to change the status to <strong>{lead ? "Mislead" : "Lead"}</strong>? </p>
              <div className='w-full flex flex-row justify-end p-4 gap-2'>
                <button className="p-2 bg-black text-white rounded " onClick={() => setModal(false)}>Close</button>
                <Button callHandler={() => UpdateLeadStatus(id, lead)}>Change State</Button>
              </div>

            </>
            : <RingLoader />

        }

      </Modal>
    )
  }

  const columns = [

    {
      name: 'Session Date',
      selector: row => convert(row.UpdatedAt),
      /* center: true, */

    },
    {
      name: 'Location',
      selector: row => <p >{row?.locationInformation?.Country}, {row?.locationInformation?.Region}</p>,
      center: true,


    },
    {
      name: 'Referrer',
      selector: row => row?.Reffer ? row?.Reffer : "Direct",
      center: true,

    },
    {
      name: 'System Information',
      selector: row => row.Platform,
      center: true,

    },
    {
      name: 'Device Platform',
      button: 'true',
      selector: row => row.Device === "Desktop" ? <IoDesktopOutline title='Desktop' style={{ mrgin: 0, textAlign: 'center' }} /> : <IoMdPhonePortrait title='Mobile' />,


    },
    {
      name: ' Lead',
      button: 'true',
      selector: row => <Button callHandler={() => setModal(<ChangeLeadModal lead={row.lead} id={row._id} />)}>{row.lead ? "Lead" : "Mark as lead"}</Button>
    },
    {
      name: 'View',
      button: true,
      cell: row => <button><Link to={`/dashboard/leads/${row._id || row.sessionID}`} className="flex items-center text-[10px]"> <MdReadMore className='text-3xl' title='Lead Detail' /></Link></button>,

    }

  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
    
  }, [data]);

  
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#0e5ba9",

      }
    },
    headCells: {
      style: {
        padding: '8px',

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


 


  function DateFilter(pre) {
    let currUS = new Date().toLocaleString("en-US", { timeZone: 'America/Chicago' })
    const m = new moment(currUS)
    let we = m.subtract(7, 'days');
    let mo = m.subtract(30, 'days');
    const filtData = pre.filter(sData => {
      const bef = sData?.createdAt;
      const aft = we;
      if (filters.date === 'week') {
        return (new Date(bef) - new Date(aft) > 0)
      }
      else if (filters.date === 'today') {
        return new moment(bef).format("YYYY-MM-DD ") === new moment(currUS).format("YYYY-MM-DD ")
      }
      else if (filters.date === 'yesterday') {
        return new moment(bef).format("YYYY-MM-DD ") === new moment(currUS).subtract(1, 'days').format("YYYY-MM-DD ")
      }
      else if (filters.date === 'month') {
        return (new Date(bef) - new Date(mo) > 0)
      }
      else if (filters.date === '') {

        return pre
      }
      
    })
    return filtData

  }



  useEffect(() => {


    setFilterData(pre => {
      let dfl = DateFilter(data)
      let lf = dfl.filter(sd => filters.country != "" ? sd?.locationInformation?.Country === filters.country : data);
      let ff = lf.filter(sd => filters.form != "" ? sd?.FormFieldValues.find(data => data.formName == filters.form) : lf);
      let lef = ff.filter(sd => filters.lead != "" ? (filters.lead === "Leads" ? sd.lead : !sd.lead) : ff);
      return lef
    })





  }, [filters, data])

  const fetchAllForms = async () => {
    const results = await axios.post(GET_ALL_FORMS, {
      domainID: DomainID,
      status: true
    });
    if (results.data) {
      let forms = results.data.data;
      let formsOptions = [


        {
          value: "",
          label: "All"
        }
      ]


      forms?.map(option => {
        return formsOptions.push({
          label: sentenceCase(option.form_name),
          value: option.form_name
        })
      })
   
      setAllForms(formsOptions);
    }
  }



  useEffect(() => {

    fetchAllForms()

    ResetFliter()

  }, [DomainID])





  const ExpandedComponent = ({ data }) => {



    return (
      <div>
        {
          data?.FormFieldValues?.length > 0 ?
            <div className='flex flex-col m-1 rounded-md p-2 gap-1 bg-slate-200'>
              {
                data?.FormFieldValues?.map((forms, i) => {

                  return (


                    <div className='w-full'>
                      <Collapse



                      >
                        <Panel className='text-md font-semibolder bg-white rounded' header={`${i + 1}. ${forms?.formName}`}>
                          <table className='border w-full rounded-md '>
                            <tr className='text-center border'>
                              <th className='border'>Field</th>
                              <th className='w-32'>Value</th>

                            </tr>
                            {
                              Object.entries(forms.allFieldData).map((keys, i) => {
                                return (
                                  <tr className='text-center border' >

                                    <td className='text-xs w-24 bg-white p-1 rounded border'>{keys[0]} </td>
                                    <td>{keys[1]}</td>
                                  </tr>
                                )
                              })
                            }
                          </table>
                        </Panel>
                      </Collapse>
                    </div>

                  )
                })
              }
            </div>
            : <p className='text-sm font-semibold text-center m-1 rounded-md p-2 gap-1 bg-slate-200 '>No Form Data Related to this Session</p>
        }

      </div>
    )
  }

  const handleFormSelectionChange = (value, key) => {

    console.log(value, key)

    setFilters((pre) => {
      return {
        ...pre,
        [key]: value
      }
    })
  }



  function ResetFliter() {

    setFilters({
      lead: "",
      date: "",
      form: "",
      country: "",
    })
    setFilterData(data)
  }


  return (
    <div className='h-full  pb-2 '>

      {
        modal ?
          <div className={styles.modalView}>
            <div className={styles.view}>
              {modal}
            </div>
          </div>
          : ""
      }

      <ToastContainer
        position="top-right"
        autoClose={500}
        newestOnTop={false}
        rtl={false}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />

      <Card propsStyle="p-4">
        {
          !loader ?

            <div className='p-4 pb-4 flex flex-row justify-between items-center '>
              <div className='flex gap-4  items-center'>

                <div className='flex flex-col relative'>
                  <Select
                    options={leadsOptions}
                    placeholder="Leads"
                    value={filters.lead}
                    style={{
                      width: 120,
                      fontSize: 14,

                    }}
                    onChange={(e) => handleFormSelectionChange(e, "lead")} size="large" />
                  <span className='absolute -mt-2 ml-2 bg-white text-xs text-sky-600'>Lead</span>
                </div>

                <div className='flex flex-col relative'>
                  <Select
                    options={durationOptions}
                    value={filters.date}
                    /*  defaultValue="Duration" */
                    placeholder="Duration"
                    style={{
                      width: 120,
                      fontSize: 14
                    }}
                    onChange={(e) => handleFormSelectionChange(e, "date")} size="large" />
                  <span className='absolute -mt-2 ml-2 bg-white text-xs text-sky-600'>Duration</span>
                </div>
                <div className='flex flex-col relative'>
                  <Select
                    options={locationOptions}
                    placeholder="Location"
                    /*   defaultValue="Location" */
                    value={filters.country}
                    style={{
                      width: 120,
                      fontSize: 14
                    }}
                    onChange={(e) => handleFormSelectionChange(e, "country")} size="large" />
                  <span className='absolute -mt-2 ml-2 bg-white text-xs text-sky-600'>Country</span>
                </div>

                <div className='flex flex-col relative'>
                  <Select
                    options={allForms}
                    value={filters.form}
                    placeholder="Forms"

                    style={{
                      width: 120,
                      fontSize: 14
                    }}
                    onChange={(e) => handleFormSelectionChange(e, "form")} size="large" />
                  <span className='absolute -mt-2 ml-2 bg-white text-xs text-sky-600'>Forms</span>
                </div>

                < Button callHandler={ResetFliter}>Reset</Button>
              </div>
              <div className='flex gap-4 items-center '>

                <SessionDownloader data={data}/>
              </div>

            </div>

            : ""

        }


        <DataTable
          columns={columns}
          data={filterData}

          customStyles={customStyles}
          progressPending={loader}
          progressComponent={<RingLoader />}
          pagination
          expandableRows

          expandableIcon={{
            collapsed: <IoIosArrowDown />,
            expanded: <IoIosArrowUp />
          }
          }
          expandableRowDisabled={row => ! row.FormFieldValues.length }
          expandableRowsComponent={ExpandedComponent}
          className="shadow-4xl text-lg pb-2"
        />
      </Card>
    </div>
  );
};
export default SessionTable