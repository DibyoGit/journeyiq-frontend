import styles from './table.module.scss'
import {IoDesktopOutline  } from 'react-icons/io5'
import {IoMdPhonePortrait } from 'react-icons/io'
import { Link } from 'react-router-dom'
import {TbArrowBarRight} from 'react-icons/tb'

const customStyle = {
    th:{

    },
    tr:{
        textAlign:'left',
        padding:"10px",
        fontSize:"14px",
        padding:"10px"
    },
    link:{
        color:"blue"
    }
}

export const ReactTable = ({ data }) => {
    let c1 = "#E0E0E0" ;
    let c2 ="#D8D8D8" ;
    
    return (
        <table className='font-light' style={{ marginTop: "20px" , padding:"50px" , fontSize:"12px" }}>
            <thead className='p-10' >
                <tr style={{backgroundColor:"#778899" , padding:"20px"}}>
                    <th>Session ID</th>
                    <th>Info</th>
                    <th>Referer</th>
                    <th>Device Info</th>
                    <th>Platform</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody style={{ padding:"20px"}}>
                {
                    data?.map((session,idx )=> {
                        
                        let cal = idx % 2
                        return (
                            <tr  style={{padding:"20px" , backgroundColor:(cal === 1 ? c1 : c2) , textAlign:'center' }}>
                                <td style={{textAlign:"center"}}>{session.sessionID}</td>
                                <td>
                                    <div>
                                        <p>{session.title}</p>
                                        <p>{session.locationInformation.Country}, {session.locationInformation.Region}</p>
                                    </div>
                                </td>
                                <td>{session.Reffer? session.Reffer :"Direct"}</td>
                                <td>{session.Platform}</td>
                                <td>{session.Device ==="Desktop" ?  <IoDesktopOutline  /> : <IoMdPhonePortrait/>}</td>
                                <td><Link style={customStyle.link} to={`/leads/detail?sessionID=${session.sessionID}`}><TbArrowBarRight/></Link></td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
    )
}