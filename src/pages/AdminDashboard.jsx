import React from 'react'
import DashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import UserlistMenu from '../components/adminDashboard/UserlistMenu'
import AdminDashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import ProductChart from '../components/adminDashboard/ProductChart'

function AdminDashboard() {
  return (
    <div className="mt-8 px-5 py-10 lg:px-10 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%]">
      <AdminDashboardMenu/>
      <ProductChart/>
    </div>
  )
}

export default AdminDashboard

