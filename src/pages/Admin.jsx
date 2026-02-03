import AdminDashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import ProductChart from '../components/adminDashboard/ProductChart'

function Admin() {
  return (
    <div className="px-5 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%]">
      <AdminDashboardMenu/>
      <ProductChart/>
    </div>
  )
}

export default Admin

