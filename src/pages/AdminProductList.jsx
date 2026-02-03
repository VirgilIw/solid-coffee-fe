import AdminDashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import ProductList from '../components/adminDashboard/ProductList'

function AdminProductList() {
  return (
    <div className="px-5 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%]">
      <AdminDashboardMenu/>
      <ProductList/>
    </div>
  )
}

export default AdminProductList
