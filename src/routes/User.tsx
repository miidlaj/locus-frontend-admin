import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import SideBar from "../component/common/SideBar";
import ResortHomePage from "../pages/resort/ResortHomePage";
import DashNav from "../component/Nav/DashNav";
import Resort from "../pages/resort/Resort";
import Facility from "../pages/resort/Facility";
import Category from "../pages/resort/Category";
import ResortDetails from "../pages/resort/ResortDetails";
import RoomType from "../pages/resort/room/RoomType";
import RoomFacility from "../pages/resort/room/RoomFacility";

const User = () => {
  return (
    <>
      {/* <SideBar /> */}
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
        <DashNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resorts" element={<Resort />} />
            <Route path="/resorts/facility" element={<Facility />} />
            <Route path="/resorts/category" element={<Category />} />
            <Route path="/resorts/room/facility" element={<RoomFacility />} />
            <Route path="/resorts/room/type" element={<RoomType />} />
            <Route path="/resorts/details" element={<ResortDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default User;
