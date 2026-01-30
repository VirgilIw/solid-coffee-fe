import React from 'react'
import DashNav from '../ui/dashboardUi/DashNav'
import { Outlet } from 'react-router'

function DashboardLayout() {
  return (
    <>
      <DashNav/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default DashboardLayout
