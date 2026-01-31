import React, { useState } from "react";

import DashboardIcon from "../../assets/adminDashborad/DashboardIcon.svg";
import ProductIcon from "../../assets/adminDashborad/ProductIcon.svg";
import OrderIcon from "../../assets/adminDashborad/Bag.svg";
import UserIcon from "../../assets/adminDashborad/UserIcon.svg";
import LogoutIcon from "../../assets/adminDashborad/LogoutIcon.svg";

function AdminDashboardMenu() {
  const [activeMenu, setActiveMenu] = useState();

  const handleMenuClick = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const menu = [
    { id: 1, name: "Dashboard", icon: DashboardIcon },
    { id: 2, name: "Product", icon: ProductIcon },
    { id: 3, name: "Order", icon: OrderIcon },
    { id: 4, name: "User", icon: UserIcon },
    { id: 5, name: "Keluar", icon: LogoutIcon},
  ];
  return (
    <div className="hidden md:block md:p-5">
      <div className="flex flex-col items-center justify-center">
        {menu.map((item) => (
          <button 
            isActive={activeMenu === item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`${activeMenu == item.id ? 'bg-brand-orange' : 'bg-white'} 
            flex items-center gap-3 p-2 w-full border-0 rounded-lg`}
          >
            <div>
              <img src={item.icon} alt={`${item.name}-icon`} />
            </div>
            <div>
              <p>{item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardMenu;
