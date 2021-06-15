import { RiArrowDropDownLine } from "react-icons/ri";
import Cards from "./components/Cards.jsx";
import Az from "./assests/az-background.jpg";
import Italy from "./assests/italy-background.png";
import Paris from "./assests/paris.bg.jpg";
import England from "./assests/england.jpg";
import { CSSTransition, Transition } from "react-transition-group"; // ES6
import { GrClose } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import Slider from "./components/Slider";
import Navbar from "./components/Navbar";
import GuestIcon from "./assests/guest-icon.png";
import Chart from "./components/Chart";
import {
  BrowserRouter as Router,
  Switch as Link,
  Route,
  Redirect,
} from "react-router-dom";
import weather from "./assests/weather.json";
import Settings from "./components/Settings";
import HourlySlider from "./components/HourlySlider.jsx";
import DailyCard from "./components/DailyCard";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
//We need router to add the ability ro handle routing in react
function App() {
  //api key: 004d873acf1ccd606483135a214f13d1
  //33.468880958416364, -112.0893868131333

  const [newData, setNewData] = useState(weather);
  // const [lat, setLat] = useState(33.53596730937949)
  // const [lon, setLon] = useState(-112.2928500313519)
  const [showNav, setShowNav] = useState(
    window.innerWidth <= 900 ? false : true
  );
  const [activeNav, setActiveNav] = useState(false);

  // useEffect( () => {
  //   axios(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=004d873acf1ccd606483135a214f13d1`)
  //   .then( (response) => {
  //     setNewData(response.data)
  //   })
  //   .catch(error => {
  //     console.error("error fetching data", error)
  //   })
  // })

  const [cityDaily, setCityDaily] = useState({
    city: "Buckeye",
    country: "United States of America",
  });

  const [city, setCity] = useState("Buckeye");
  const [activePage, setActivePage] = useState("today");
  const [currSlide, setCurrSlide] = useState(0);
  const [animation, setAnimation] = useState("out");
  const [cityData, setCityData] = useState([
    {
      id: 1,
      name: "Buckeye",
      active: true,
      src: Az,
    },
    {
      id: 2,
      name: "Paris",
      active: false,
      src: Paris,
    },
    {
      id: 3,
      name: "Venice",
      active: false,
      src: Italy,
    },
    {
      id: 4,
      name: "London",
      active: false,
      src: England,
    },
  ]);
  const key = 'b5dfc73c8f9e83c216a11e11f51a6251'

  const [chart, setChart] = useState(true);

  const miniCardData = (temp, day, humidity, wind, icon) => {
    let data = {
      temp: temp,
      day: day,
      humidity: humidity,
      wind: wind,
      icon: icon,
    };
    console.log(data);
    setTemp({ temp: data.temp, humidity: humidity, wind: wind, icon: icon });
  };
  const data = {
    today: [
      newData["hourly"][4],
      newData["hourly"][11],
      newData["hourly"][16],
      newData["hourly"][23],
    ],
    hourly: [],
    grabHourly() {
      for (let i = 0; i < 48; i++) {
        this.hourly.push(newData["hourly"][i]);
      }
    },
    arr: [],
    data: ["01d", "02d", "03d", "01n"],
    getDaily() {
      this.data.forEach((curr) => {
        for (let i in newData.hourly) {
          if (newData.hourly[i].weather[0].icon === curr) {
            this.arr.push(newData.hourly[i]);
            break;
          }
        }
      });
    },
    daily: newData["daily"].slice(0, 7),
  };

  const [temp, setTemp] = useState({
    // temp: weather["hourly"][4]["temp"],
    // humidity: weather["hourly"][4]["humidity"],
    // wind: weather["hourly"][4]["wind_speed"],
    // icon: "https://img.icons8.com/office/50/000000/rainbow.png",
  });
  
useEffect(() => {
  const getData = async function(){
   let {data:{current}} = await axios.get('http://api.weatherstack.com/current',{
      params:{
        query:'buckeye',
        access_key:key,
        units:'f'
      }
    })
    setTemp({temp:current.temperature,humidity:current.humidity,wind:current.wind_speed,icon:'https://img.icons8.com/office/50/000000/rainbow.png'})
  }
  getData()
},[])
  const cityName =async (e) => {
    let target;
    if (e.target.textContent) {
      setCity(e.target.textContent);
      target = e.target.textContent;
    } else {
      setCity(e.target.alt);
      target = e.target.alt;
    }
    let country;
    


    switch (target) {
      case "Paris":
        country = "France";
        break;
      case "Buckeye":
        country = "United States";
        break;
      case "Venice":
        country = "Italy";
        break;
      case "Madrid":
        country = "Spain";
        break;
      default:
        country = "United States";
        break;

        
    }

    let {data} = await axios.get('http://api.weatherstack.com/current',{
      params:{
        query:target.toLowerCase(),
        access_key:key,
        units:'f'
      }
    })
    setTemp({temp:data.current.temperature,humidity:data.current.humidity,wind:data.current.wind_speed,icon:'https://img.icons8.com/office/50/000000/rainbow.png'})

    console.log(data);
    setCityDaily({
      city: target,
      country: country,
    });
    setCityData(
      cityData.map((obj) => {
        if (obj.name === target) {
          return { ...obj, active: (obj.active = true) };
        } else if (obj.active) {
          return { ...obj, active: !obj.active };
        }
        return target === obj.name ? { ...obj, active: !obj.active } : obj;
      })
    );
  };
  const activeCity = (e) => {
    cityName(e);
  };

  const checkSize = () => {
    setShowNav(window.innerWidth <= 900 ? false : true);
    if (showNav) setActiveNav(false);
  };
  const [showNavbtn, setshowNavbtn] = useState(true);

  const toggleNav = () => {
    setActiveNav(!activeNav);
    setAnimation("out");
  };

  const [text,setText] = useState('')

  return (
    <>
      {window.addEventListener("resize", checkSize)}
      {data.grabHourly()}
      {data.getDaily()}
      <div className="bigContainer" style={{ backgroundColor: "#4FA1CA" }}>
        <div className="app-container">
          {showNav ? (
            <Navbar
              toggleNav={toggleNav}
              showNav={showNav}
              data={cityData}
              activeF={activeCity}
              cityDaily={cityDaily}
              temp={temp}
              setActive={(val) => {
                setActivePage(val);
              }}
              activeNav={activeNav}
            />
          ) : (
            <>
              {activeNav ? (
                <GrClose
                  className="menu"
                  style={{
                    color: "rgb(107, 179, 221)",
                    fill: "rgb(107, 179, 221)",
                  }}
                  onClick={() => {
                    setActiveNav(false);
                    setshowNavbtn(!showNavbtn);
                    setAnimation("out");
                    console.log(showNavbtn);
                  }}
                />
              ) : (
                <GiHamburgerMenu
                  className="menu"
                  onClick={() => {
                    setActiveNav(true);
                    setshowNavbtn(!activeNav);
                    setAnimation("in");
                    console.log(animation);
                  }}
                />
              )}
            </>
          )}

          {!showNav && (
            <Navbar
              toggleNav={toggleNav}
              showNav={showNav}
              data={cityData}
              activeF={activeCity}
              cityDaily={cityDaily}
              temp={temp}
              setActive={(val) => {
                setActivePage(val);
              }}
              activeNav={activeNav}
              animation={animation}
            />
          )}

          {/* weather forecast */}

          {activePage !== "settings" ? (
            <div className="forcast-con">
              <div
                className="justify-content-around align-items-center forehead"
                style={{ width: "95%", height: "20%" }}
              >
                <form action="" onSubmit = {async (e) => {
                  e.preventDefault()
                
    let {data} = await axios.get('http://api.weatherstack.com/current',{
      params:{
        query:text.toLowerCase(),
        access_key:key,
        units:'f'
      }
    })
    setTemp({temp:data.current.temperature,humidity:data.current.humidity,wind:data.current.wind_speed,icon:'https://img.icons8.com/office/50/000000/rainbow.png'})

    setCityDaily({
      city: data.location.name,
      country: data.location.country,
    });
                }}>
                <input value = {text} onChange = {(e) => {
                    setText(e.target.value)
                }}  type = 'text' placeholder = 'plaese search city'/>
                </form>

                <div className="icon">
                  <div className="icon-pic">
                    <img src={GuestIcon} alt="" />
                  </div>
                  <div className="name">Guest</div>
                  <div className="dropdown">
                    <RiArrowDropDownLine style={{ fontSize: "30px" }} />
                  </div>
                </div>

              </div>

              <div className="daily-card-con">
                <DailyCard cityDaily={cityDaily} temp={temp} />
              </div>

              <div className="weather-forcast" style={{ height: "30%" }}>
                <h3
                  style={{
                    paddingBottom: "20px",
                    paddingLeft: "20px",
                  }}
                >
                  Weather Forecast
                </h3>

                <div className="citys" style={{ padding: "0px" }}>
                  <Cards activeF={activeCity} data={cityData} />
                </div>
              </div>

              <Router>
                <Route
                  path="/slider"
                  component={() => {
                    return activePage !== "hourly" ? (
                      <Slider
                        chart={chart}
                        chartToggle={() => setChart(!chart)}
                        miniData={miniCardData}
                        arr={data[activePage]}
                        city={city}
                        active={activePage}
                      />
                    ) : (
                      <HourlySlider
                        chart={chart}
                        chartToggle={() => setChart(!chart)}
                        miniData={miniCardData}
                        arr={data["hourly"]}
                        city={city}
                        active={activePage}
                        currSlide={currSlide}
                        setCurrSlide={(val) => {
                          setCurrSlide(val);
                        }}
                      />
                    );
                  }}
                />

                <Redirect to="/slider"></Redirect>

                <Route
                  path="/chart"
                  component={() => (
                    <Chart
                      activePage={activePage}
                      chart={chart}
                      chartToggle={() => setChart(!chart)}
                      newData={newData}
                      weather={data}
                    />
                  )}
                />
              </Router>
            </div>
          ) : (
            <Settings />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
