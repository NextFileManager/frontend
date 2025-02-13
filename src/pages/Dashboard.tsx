import BreadCrumb from "../components/dashboard/BreadCrumb";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHome from "../components/dashboard/sections/Dashboard";
import Starred from "../components/dashboard/sections/Starred";
import Shared from "../components/dashboard/sections/Shared";
import Trash from "../components/dashboard/sections/Trash";
import MyFiles from "../components/dashboard/sections/MyFiles";
import { Route, Routes } from "react-router-dom";

const Dashboard: React.FC = () => {
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
            <Route index element={<DashboardHome />} />
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

export default Dashboard;
