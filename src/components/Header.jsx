const Header = ({ logo }) => {
  return (
    <>
      <div
        style={{
          height: "15%",
          fontFamily: "Balsamiq Sans",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            color: "#4FA1CA",
            width: "100%",
            fontSize: "30px",
          }}
        >
          {" "}
          <img height="90px" src={logo} alt="ATLAS"></img>
        </div>
      </div>
    </>
  );
};

export default Header;
