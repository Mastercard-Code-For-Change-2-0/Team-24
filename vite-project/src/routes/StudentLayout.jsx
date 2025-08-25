import { Outlet } from "react-router-dom";

import Sidebar from "../component/Sidebar";

const StudentLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default StudentLayout;