const Header = ({ logo }) => {
  return (
    <>
      <div
        style={{
          height: "15%",
          color: "white",
          fontSize: "22px",
          fontWeight: "500",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ color: "#4FA1CA", width: "100%", fontSize: "30px" }}
        >
          {" "}
          <img height="50px" src={logo} alt = "ATLAS"></img> ATLAS
        </div>
      </div>
    </>
  );
};

export default Header;
