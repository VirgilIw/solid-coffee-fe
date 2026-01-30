import React from 'react'
import DashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import UserlistMenu from '../components/adminDashboard/UserlistMenu'
import AdminDashboardMenu from '../components/adminDashboard/AdminDashboardMenu'

function AdminDashboard() {
  return (
    <div className="grid grid-cols-[30%_70%]">
      <AdminDashboardMenu/>
      <UserlistMenu/>
    </div>
  )
}

export default AdminDashboard

