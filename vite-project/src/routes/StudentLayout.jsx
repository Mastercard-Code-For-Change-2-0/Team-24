import { Outlet } from "react-router-dom";

import Sidebar from "../component/Sidebar";

const StudentLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;