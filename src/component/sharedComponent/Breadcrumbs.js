
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

/* const routes = [
    { path: '/dashboard/acquisition', breadcrumb: 'Acquisition Details' },
    { path: '/dashboard/ecommerce', breadcrumb: 'Ecommerce Details' },
    { path: '/dashboard/behaviour', breadcrumb: 'Behaviour Details '  },
    {path: '/dashboard/feedback' , breadcrumb:'Feedback'},
    { path: '/dashboard/countrysales', breadcrumb: 'Sales From Country Details '  },
    { path: '/dashboard/productsales', breadcrumb: 'Product Sale Details '  },
    { path:'/settings/account' , breadcrumb:'Account Settings'},
    { path:'/settings/forms' , breadcrumb:'Forms Settings'},
    { path:'/settings/ip' , breadcrumb:'IP Settings'},
    { path:'/settings/domain' , breadcrumb:'Domain Settings'},
    {path:'/dashboard/leads/:sessionID' , breadcrumb:`Session Details( ${:sess} )`},
  
    { path: '/', breadcrumb: '' }
  ];
 */
function Breadcrumbs() {
    const location = useLocation();
    
    const { sessionID } = useParams()
    const routes = [
      { path: '/dashboard/acquisition', breadcrumb: 'Acquisition Details' },
      { path: '/dashboard/ecommerce', breadcrumb: 'Ecommerce Details' },
      { path: '/dashboard/behaviour', breadcrumb: 'Behaviour Details '  },
      {path: '/dashboard/feedback' , breadcrumb:'Feedback'},
      { path: '/dashboard/countrysales', breadcrumb: 'Sales From Country Details '  },
      { path: '/dashboard/productsales', breadcrumb: 'Product Sale Details '  },
      { path:'/settings/account' , breadcrumb:'Account Settings'},
      { path:'/settings/forms' , breadcrumb:'Forms Settings'},
      { path:'/settings/ip' , breadcrumb:'IP Settings'},
      { path:'/settings/domain' , breadcrumb:'Domain Settings'},
      {path:'/dashboard/leads/:sessionID' , breadcrumb:`Session Details ( ${sessionID} )`},
    
      { path: '/', breadcrumb: '' }
    ];
    const breadcrumbs = useReactRouterBreadcrumbs(routes);
  return (
    <div className='flex  mb-2  '>
         {breadcrumbs.map(({ match, breadcrumb , key}) => (
        <Link key={key} to={key}
         style={{display:"flex"}}
          className={match.pathname === location.pathname ? "text-[12px] text-blue-400  " : "text-[12px]  text-gray-400  "}
         >
         {breadcrumb} { match.pathname === location.pathname ? "" : match.pathname === "/" ? "":<span className="text-lg text-gray-400"><IoIosArrowForward/></span>}  {""}
        </Link>
      ))}</div>
  )
}

export default Breadcrumbs