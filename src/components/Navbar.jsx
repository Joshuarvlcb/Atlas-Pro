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
import Cards from "./Cards";

const Navbar = ({
  setActive,
  temp,
  cityDaily,
  activeNav,
  activeF,
  data,
  showNav,
  toggleNav,
  animation,
}) => {
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
            name="Today"
            logo={
              <BiHome
                color="white"
                style={{ marginRight: "20px", fontSize: "30px" }}
              />
            }
            onclick={() => {
              setActive("today");
              if (!showNav) toggleNav();
            }}
          ></NavLinks>
        </div>
        <div>
          <NavLinks
            name="Hourly"
            logo={
              <Ri24HoursLine
                color="white"
                style={{ marginRight: "20px", fontSize: "30px" }}
              />
            }
            onclick={() => {
              setActive("hourly");
              if (!showNav) toggleNav();
            }}
          />
        </div>
        <div>
          <NavLinks
            name="Daily"
            logo={
              <BiCalendarWeek
                color="white"
                style={{ marginRight: "20px", fontSize: "30px" }}
              />
            }
            onclick={() => {
              setActive("daily");
              if (!showNav) toggleNav();
            }}
          />
        </div>
        <div>
          <NavLinks
            name="Settings"
            logo={
              <FiSettings
                color="white"
                style={{ marginRight: "20px", fontSize: "30px" }}
              />
            }
            onclick={() => {
              setActive("settings");
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
