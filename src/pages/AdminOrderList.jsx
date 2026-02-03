import AdminDashboardMenu from "../components/adminDashboard/AdminDashboardMenu";
import OrderList from "../components/adminDashboard/OrderList";


function AdminOrderList() {
  return(
    <div className="px-5 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%]">
        <AdminDashboardMenu/>
        <OrderList/>
    </div>
  );
};

export default AdminOrderList;
