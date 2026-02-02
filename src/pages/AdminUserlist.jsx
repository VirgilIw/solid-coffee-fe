import React from 'react'
import AdminDashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import UserListContent from '../components/adminDashboard/UserListContent'

export default function AdminUserlist() {
  return (
    <div className='grid grid-cols-[20%_80%] px-5'>
        <AdminDashboardMenu/>
        <UserListContent/>
    </div>
  )
}
