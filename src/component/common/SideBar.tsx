import React from "react";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import {
  MdHolidayVillage,
  MdDashboard,
  MdLogout,
  MdMail,
} from "react-icons/md";
import MainSmallIcon from "./MainSmallIcon";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState(false);

  const Menus = [
    { title: "Dhashboard", spacing: true, icon: <MdDashboard />, link: "/" },
    {
      title: "Resorts",
      submenu: true,
      icon: <MdHolidayVillage />,
      link: "/resorts",
      submenuItems: [
        { title: "All Resorts" },
        { title: "Category" },
        { title: "Facility" },
      ],
    },
    { title: "Inbox", icon: <MdMail /> },
    { title: "Profile", spacing: true, icon: <AiOutlineUser /> },
    { title: "Logout", icon: <MdLogout /> },
  ];
  return (
    <>
      <div className="hidden sm:flex z-50 fixed h-full">
        <div
          className={`bg-dark-teal h-screen p-5 pt-8 ${
            open ? "w-72" : "w-20"
          } duration-300 relative`}
        >
          <BsArrowLeftShort
            className={`bg-white text-dark-teal text-3xl rounded-full absolute -right-3 top-9 border border-dark-teal cursor-pointer duration-500 ${
              !open && "rotate-180"
            }`}
            onClick={() => {
              setOpen(!open);
            }}
          />

          <div className="inline-flex">
            <MainSmallIcon
              className={`rounded cursor-pointer block float-left mr-2 -ml-3 duration-500 scale-75 ${
                open && "rotate-[360deg] sclae-100"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 mt-5 ${
                !open && "scale-0"
              }`}
            >
              Admin
            </h1>
          </div>

          <div
            className={`flex items-center rounded-md bg-light-white mt-6 py-2 ${
              !open ? "px-2.5" : "px-4"
            }`}
          >
            <BsSearch
              className={`text-white text-lg block float-left cursor-pointer ${
                open && "mr-2"
              }`}
            />

            <input
              type="search"
              placeholder="Search"
              className={`text-base bg-transparent w-full text-white focus:outline-none ${
                !open && "hidden"
              }`}
            />
          </div>

          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <>
                <Link to={`${menu.link ? menu.link : "/"}`} key={index}>
                  <li
                    key={index}
                    className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                      menu.spacing ? "mt-9" : "mt-2"
                    } `}
                  >
                    <span className="text-2xl block float-left">
                      {menu.icon}
                    </span>
                    <span
                      className={`text-base font-medium flex-1 ${
                        !open && "hidden"
                      }`}
                    >
                      {menu.title}
                    </span>

                    {menu.submenu && open && (
                      <BsChevronDown
                        className={`text-black font-bold ${
                          submenuOpen && "rotate-180"
                        }`}
                        onClick={() => {
                          setSubmenuOpen(!submenuOpen);
                        }}
                      />
                    )}
                  </li>
                </Link>

                {menu.submenu && submenuOpen && open && (
                  <ul>
                    {menu.submenuItems.map((submenuItem, index) => (
                      <li
                        key={index}
                        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}
                      >
                        {submenuItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
};

export default SideBar;
