import { Outlet } from "react-router-dom";
import CustomNavbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <CustomNavbar />
      <div className="bg-content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
