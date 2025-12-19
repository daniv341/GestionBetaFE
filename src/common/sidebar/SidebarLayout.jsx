import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavBar from "./navBar";
import "./sidebarLayout.css";

const SidebarLayout = () => {
  return (
    <div className="app-layout">
        <Sidebar />


      <section className="app-main">
        <NavBar />
        <main className="app-content">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default SidebarLayout;