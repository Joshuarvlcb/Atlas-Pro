import { Nav } from "react-bootstrap";

const NavLinks = ({ name, logo, onclick, active }) => {
  return (
    <Nav.Item>
      <Nav.Link
        onClick={onclick}
        style={{
          color: "white",
          fontWeight: "600",
        }}
        className={
          active
            ? "d-flex    align-items-center  activeTab "
            : "d-flex align-items-center "
        }
      >
        {logo} {name}
      </Nav.Link>
    </Nav.Item>
  );
};
export default NavLinks;
