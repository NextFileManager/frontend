import { FC, useState } from "react";
import BreadCrumb from "../components/home/BreadCrumb";
import Header from "../components/home/Header";
import Sidebar from "../components/home/Sidebar";
import Home from "../components/home/sections/Home"; 
import Starred from "../components/home/sections/Starred";
import Shared from "../components/home/sections/Shared";
import Trash from "../components/home/sections/Trash";
import MyFiles from "../components/home/sections/MyFiles";
import { Route, Routes } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 h-full dark:bg-gray-900 flex flex-col pb-10">
      <Header />
      <div className="flex flex-1">
        {/* Pass the setOpenSection function to Sidebar */}
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="p-2 pl-6 items-end">
            <BreadCrumb />
          </div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="myfiles" element={<MyFiles />} />
            <Route path="shared" element={<Shared />} />
            <Route path="starred" element={<Starred />} />
            <Route path="trash" element={<Trash />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
