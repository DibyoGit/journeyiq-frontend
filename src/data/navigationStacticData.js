
import { MdAccountBox, MdLogout, MdBarChart, MdHome, MdSettings, MdPermDataSetting, MdTextSnippet } from 'react-icons/md'
import { BsBuilding } from 'react-icons/bs'
import { CgTranscript } from 'react-icons/cg'
export const navs = [
    {
        id: 1,
        name: "Dashboard",
        icons: <MdHome />,
        path: "/"
    },
    {
        id: 2,
        name: "leads",
        icons: <MdBarChart />,
        path: "/dashboard/leads",

    }
  /*   , {
        id: 3,
        name: "Domain Settings",
        icons: <CgTranscript />,
        path: "/domain/settings"
    },
    {
        id: 4,
        name: "Forms Settings",
        icons: <MdTextSnippet />,
        path: "/forms/settings"
    },
    {
        id: 5,
        name: "IP LISTING",
        icons: <MdPermDataSetting />,
        path: "/ips"
    } */
    , {
        id: 6,
        name: "Settings",
        icons: <MdSettings />,
        path: "/settings"
    }


]