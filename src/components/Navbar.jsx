import React from "react";
import { Nav } from "react-bootstrap";
import NavLinks from "./NavLinks";
import Header from "./Header";
import DailyCard from "./DailyCard";
import { BiHome } from "react-icons/bi";
import { Ri24HoursLine } from "react-icons/ri";
import { BiCalendarWeek } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Logo from "../assests/weather-logo.png";
import { useEffect } from "react";
import Cards from "./Cards";

const Navbar = ({
  setActive,
  temp,
  cityDaily,
  activeNav,
  activeF,
  showNav,
  toggleNav,
  animation,
  data,
  setData,
  dataObj,
  activePage,
  search,
}) => {
  useEffect(() => {
    console.log(search);
  }, []);

  return (
    <div
      className="nav-container"
      id="navbar-con"
      style={{
        margin: "0",
        animationName: animation === "out" ? "navbarOut" : "navbarIn",
      }}
    >
      <Header logo={Logo} />

      <Nav
        className="d-flex
        flex-column 
        justify-content-between 
       "
        style={{
          height: "31%",
          fontFamily: "Quicksand, sans-serif",
          letterSpacing: "2px",
          width: "80%",
          margin: "auto",
        }}
      >
        <div>
          <NavLinks
            onclick={() => {
              if (!showNav) toggleNav();
            }}
            city={cityDaily}
            name="Today"
            dataObj={dataObj}
            setData={setData}
            setActive={setActive}
            activePage={activePage}
            logo={
              <BiHome
                color="white"
                style={{ marginRight: "20px", fontSize: "35px" }}
              />
            }
          ></NavLinks>
        </div>
        <div>
          <NavLinks
            city={cityDaily}
            dataObj={dataObj}
            setData={setData}
            activePage={activePage}
            setActive={setActive}
            name="Hourly"
            logo={
              <Ri24HoursLine
                color="white"
                style={{ marginRight: "20px", fontSize: "35px" }}
              />
            }
            onclick={() => {
              if (!showNav) toggleNav();
            }}
          />
        </div>
        <div>
          <NavLinks
            city={cityDaily}
            dataObj={dataObj}
            setData={setData}
            name="Daily"
            setActive={setActive}
            activePage={activePage}
            logo={
              <BiCalendarWeek
                color="white"
                style={{ marginRight: "20px", fontSize: "35px" }}
              />
            }
            onclick={() => {
              if (!showNav) toggleNav();
            }}
          />
        </div>
      </Nav>
      {showNav && <DailyCard cityDaily={cityDaily} temp={temp} />}

      {!showNav && (
        <div className="navCities">
          <Cards activeF={activeF} data={data} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
