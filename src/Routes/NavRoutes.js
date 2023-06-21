import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Layout from '../component/Layout'
import RequireAuth from '../Hooks/RequireAuth'
import Dashobard from '../pages/Dashboard/Dashboard'
import DomainSettings from '../pages/DomainSettings/DomainSettings'
import FormSettings from '../pages/FormSettings/FormSettings'
import Leads from '../pages/Leads/Leads'
import Logintwo from '../pages/login/Login'
import Settings from '../pages/Settings/index'
import LeadDetail from '../pages/Leads/LeadsDetail/LeadDetail'
import IPList from '../pages/IP/IPList'
import Analysis from '../pages/DashboardV2/Analysis'
import {Dashboard } from '../pages/DashboardV3'
import { InsightDetail } from '../pages/DashboardV3/pages/InsightDetail'
import { Feedback } from '../pages/DashboardV3/pages/Feedback'
import { PersonalDetail } from '../pages/Settings/PersonalDetail'
import { Password } from '../pages/Settings/Password'
import AcquisitionDetail from '../pages/DashboardV3/pages/AcquisitionDetail'
import BehaviourDetail from '../pages/DashboardV3/pages/BehaviourDetail'
import EcommerceDetail from '../pages/DashboardV3/pages/EcommerceDetail'
import ProductSales from '../pages/DashboardV3/pages/ProductSales'
import CountrySales from '../pages/DashboardV3/pages/CountrySales'

function NavRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Logintwo />} />
      <Route path='/' element={<Layout />}>
        <Route element={<RequireAuth />}>
      
          <Route exact path="/" element={<Dashboard/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route path='/dashboard/v1' element={<Dashobard/>} />
          <Route path="/dashboard/acquisition" element={<AcquisitionDetail/>} />
          <Route path="/dashboard/behaviour" element={<BehaviourDetail/>} />
          <Route path="/dashboard/ecommerce" element={<EcommerceDetail/>} />
          <Route path="/dashboard/productsales" element={<ProductSales/>} />
          <Route path="/dashboard/countrysales" element={<CountrySales/>} />
          <Route path="/dashboard/feedback" element={<Feedback/>} />
          <Route path="/dashboard/leads" element={<Leads />} />
          <Route path="/dashboard/leads/:sessionID" element={<LeadDetail />} />
         
          <Route path="/settings" element={<Settings />} >
             <Route path="/settings" element={<Navigate to="/settings/account" />} />
             <Route path="/settings/account" element={<PersonalDetail />} />
             <Route path="/settings/password" element={<Password />} />
             <Route path="/settings/domain" element={<DomainSettings />} />
             <Route path="/settings/forms" element={<FormSettings />} />
            <Route path="/settings/ip" element={<IPList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default NavRoutes