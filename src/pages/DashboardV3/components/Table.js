import moment from "moment";
import DataTable from "react-data-table-component";
import Card from "../../../component/sharedComponent/Card/Card";


export function Table ({data , columns}) {

 
    
      const customStyles = {
        rows: {
            style: {
              
                textAlign:'center'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', 
                paddingRight: '8px',
                backgroundColor: "#0d5ca9" ,
                textAlign:'center' ,
                color:"white"
            },
        },
        cells: {
            style: {
               
                textAlign:'center' ,
            },
        },
    };
    return(
        <div className="shadow-xl rounded-xl">
        <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
       
        />
        </div>
    )
}