import AdminDashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import MenuList from '../components/adminDashboard/MenuList'

function AdminMenuList() {
  return (
    <div className="px-5 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%]">
      <AdminDashboardMenu/>
      <MenuList/>
    </div>
  )
}

export default AdminMenuList
