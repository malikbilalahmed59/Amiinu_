import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FlexboxGrid, Navbar } from "rsuite";

const NavBar = () => {
  return (
    <>
      <FlexboxGrid justify="center" style={{ background: "rgb(4, 32, 95)" }}>
        <FlexboxGrid.Item colspan={18} className="">
          {/* NavBar */}
          <FlexboxGrid align="middle" justify="space-between">
            <FlexboxGrid.Item>
              <Navbar.Brand as={Link} to="/app/dashboard" className="text-white">
                Amiinu
              </Navbar.Brand>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Navbar.Brand as={Link} to="/app/dashboard">
                <IoArrowBackCircleOutline style={{ fontSize: "25px" }} color="white" />
              </Navbar.Brand>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          {/* Banner */}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NavBar;
