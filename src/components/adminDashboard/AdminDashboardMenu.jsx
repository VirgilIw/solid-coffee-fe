import React from "react";
import { useNavigate, useLocation } from "react-router";

import DashboardIcon from "../../assets/adminDashborad/DashboardIcon.svg";
import ProductIcon from "../../assets/adminDashborad/ProductIcon.svg";
import OrderIcon from "../../assets/adminDashborad/Bag.svg";
import UserIcon from "../../assets/adminDashborad/UserIcon.svg";
import LogoutIcon from "../../assets/adminDashborad/LogoutIcon.svg";
import { Link } from "react-router";

function AdminDashboardMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const menu = [
    { id: 1, name: "Dashboard", icon: DashboardIcon, path: "/dashboard/admin" },
    { id: 2, name: "Product", icon: ProductIcon, path: "" },
    { id: 3, name: "Order", icon: OrderIcon, path: "" },
    { id: 4, name: "User", icon: UserIcon, path: "/dashboard/admin/users-list" },
    { id: 5, name: "Keluar", icon: LogoutIcon, path: "/login" },
  ];
  return (
    <div className="hidden md:block md:p-5 border-r-2 h-screen border-[#E8E8E8]">
      <div className="flex flex-col items-center justify-center">
        {menu.map((item) => (
          <button 
            key={item.id}
            onClick={() => handleMenuClick(item)}
            className={`${location.pathname === item.path ? 'bg-brand-orange' : 'bg-white'} 
            flex items-center gap-3 p-2 w-full border-0 rounded-lg cursor-pointer transition-colors hover:bg-[#ffad4e]`}
          >
            <Link to={item.path} className="flex w-full gap-3">
              <div>
                <img src={item.icon} alt={`${item.name}-icon`} className={`${activeMenu == item.id ? "brightness-0" : ""}`}/>
              </div>
              <div>
                <p className={`${activeMenu == item.id ? "brightness-0" : ""} text-gray-800`}>{item.name}</p>
              </div>
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardMenu;
