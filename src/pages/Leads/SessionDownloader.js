import React, { useMemo } from 'react'
import { sentenceCase } from 'sentence-case';

export default function SessionDownloader({data}) {

    /*    function convertArrayOfObjectsToCSV(array) {
    let result;
    console.log(result)
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    test()

    return result;
  } */
 

  function convertArrayOfObjectsToCSV(array){

    const columnDelimiter = ',';
    const lineDelimiter = '\n';

    
   const keys = Object.keys(array[0])

   let result = 'Country,State,City,'

   keys.forEach(element => {
         if(element === 'locationInformation' || element === 'BrowserWidthHeight' ||  element ==='FormFieldValues' || element ==='Navigation' ){
           
         }
         else if(element === '_id'){
           result += 'SessionID' ;
           result += columnDelimiter;
         }
         else{
          
          result += sentenceCase(element);
          result += columnDelimiter;
         }
   });
   result += lineDelimiter

  array.forEach(element => {
      result += `${element.locationInformation.Country }, ${element.locationInformation.Region},  ${element.locationInformation.City} ,`;
     
      Object.entries(element).forEach(ele => {
        if(ele[0] === 'locationInformation' || ele[0] === 'BrowserWidthHeight' ||  ele[0] ==='FormFieldValues' || ele[0] ==='Navigation' ){
           
        }
        
        
        else{
          if(ele[1] === true){
            result += 'Yes' ;
            result += columnDelimiter;
          }
          else if(ele[1] === false){
            result += 'NO' ;
            result += columnDelimiter;
          }
          else{
            result += ele[1] ;
            result += columnDelimiter;
          }
          
         
        }
      }) 
      result += lineDelimiter
  })

   
   return result

  } 

  function downloadCSV(array) {
   
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const date = new Date()

    const filename = `Domain-ID ${localStorage.getItem('domainID')} ${date.toLocaleDateString()} `;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

    const Export = ({ onExport }) => <button onClick={e => onExport(e.target.value)} className='p-2 bg-sky-600 text-white rounded text-sm'>Export CSV</button>;
    const ActionsMemo = useMemo(() => <Export onExport={() => downloadCSV(data)} />, [data]);
  return (
    <div>{ActionsMemo}</div>
  )
}
