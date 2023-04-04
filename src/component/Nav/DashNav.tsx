import React, { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { DashboardCustomize, Wallet } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

interface NavItemProps {
  to: string;
  label: string;
  Icon: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);
  console.log(isActive);

  return (
    <Tooltip
      title={label}
      TransitionComponent={Zoom}
      arrow
      placement="left-end"
    >

      <NavLink
        to={to}
        className={`${
          isActive ? "bg-gray-800 text-white " : "text-white/50 "
        }p-4 inline-flex justify-center rounded-md`}
      >
        {Icon}
      </NavLink>
    </Tooltip>
  );
};

const DashNav = () => {
  const Menus = [
    { title: "Dashboard", icon: <DashboardCustomize />, link: "/dashboard" },
    { title: "Resort", icon: <ApartmentIcon />, link: "/resorts" },
    { title: "Message", icon: <Wallet />, link: "/wallet" },
  ];
  
  const Controlls = [
    { title: "Settings", icon: <SettingsIcon />, link: "/settings" },
    { title: "Logout", icon: <LogoutIcon />, link: "/logout" },
  ];

  return (
    <>
      {/* Navigation */}
      <div className="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between ">
        <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2 ">
          {Menus.map((item, index) => (
            <NavItem
              key={index}
              to={item.link}
              label={item.title}
              Icon={item.icon}
            />
          ))}
        </nav>
        <div className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
          {Controlls.map((item, index) => (
            <NavItem
              key={index}
              to={item.link}
              Icon={item.icon}
              label={item.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashNav;
