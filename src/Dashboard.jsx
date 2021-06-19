import { RiArrowDropDownLine } from "react-icons/ri";
import Cards from "./components/Cards.jsx";
import Az from "./assests/az-background.jpg";
import Italy from "./assests/italy-background.png";
import { ImSearch } from "react-icons/im";
import Paris from "./assests/paris.bg.jpg";
import England from "./assests/england.jpg";
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
  useHistory,
} from "react-router-dom";
import weather from "./assests/weather.json";
import Settings from "./components/Settings";
import HourlySlider from "./components/HourlySlider.jsx";
import DailyCard from "./components/DailyCard";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";

function Dashboard() {
  const history = useHistory();
  const signout = () => {
    history.push("/login");
  };
  //api key: 004d873acf1ccd606483135a214f13d1
  //33.468880958416364, -112.0893868131333
  const [loader, setLoader] = useState(true);
  const [newData, setNewData] = useState(weather);
  // const [lat, setLat] = useState(33.53596730937949)
  // const [lon, setLon] = useState(-112.2928500313519)
  const [showNav, setShowNav] = useState(
    window.innerWidth <= 900 ? false : true
  );
  const [activeNav, setActiveNav] = useState(false);

  const [cityDaily, setCityDaily] = useState({
    city: "Buckeye",
    country: "United States",
  });

  const [city, setCity] = useState("Buckeye");
  const [activePage, setActivePage] = useState("today");
  const [currSlide, setCurrSlide] = useState(0);
  const [search, setSearch] = useState("go");
  const [animation, setAnimation] = useState("out");
  const [cityData, setCityData] = useState([
    {
      id: 1,
      name: "Buckeye",
      active: true,
      src: Az,
      locale: "en",
    },
    {
      id: 2,
      name: "Paris",
      active: false,
      src: Paris,
      locale: "fr",
    },
    {
      id: 3,
      name: "Venice",
      active: false,
      src: Italy,
      locale: "it",
    },
    {
      id: 4,
      name: "London",
      active: false,
      src: England,
      locale: "gbr",
    },
  ]);
  const key = "fc628e265dd36f7b1b6b58fe603edde8";

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

  const [temp, setTemp] = useState({});

  const [data, setData] = useState([
    {
      today: [
        newData["hourly"][4],
        newData["hourly"][11],
        newData["hourly"][16],
        newData["hourly"][23],
      ],
      hourly: [
        newData["hourly"][4],
        newData["hourly"][11],
        newData["hourly"][16],
        newData["hourly"][23],
      ],
      daily: newData["daily"].slice(0, 7),
    },
  ]);
  const genData = (value, active, str) => {
    if (str) setLoader(true);
    if (value == undefined && active == undefined) return;
    setArrData(value[active]);
    setData([{ ...value }]);
    setLoader(false);
  };

  const getCountry = async (lat, lon) => {
    const API_KEY = "QovUCt0Qmy4YXS3TL5YHkQr2spRE6wVW";
    const { data } = await axios.get(
      `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json`,
      {
        params: {
          key: API_KEY,
        },
      }
    );
    return data.addresses[0].address.country;
  };
  const [arrData, setArrData] = useState([]);

  const getWeather = async function (query) {
    let { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: query,
          appid: key,
          units: "imperial",
        },
      }
    );

    setTemp({
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: "https://img.icons8.com/office/50/000000/rainbow.png",
    });
    // return [data.coord.lat,data.coord.lon]
  };
  const getCoords = async (query) => {
    let { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: query,
          appid: key,
          units: "imperial",
        },
      }
    );

    setTemp({
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: "https://img.icons8.com/office/50/000000/rainbow.png",
    });
    console.log([data.coord.lat, data.coord.lon]);
    return [data.coord.lat, data.coord.lon];
  };
  useEffect(() => {
    getWeather("buckeye");
    const getWeek = async function () {
      const [lat, lon] = await getCoords("buckeye");
      let { data: weatherData } = await axios.get(
        "https://api.openweathermap.org/data/2.5/onecall",
        {
          params: {
            lat: lat,
            lon: lon,
            appid: key,
            units: "imperial",
          },
        }
      );
      // setData(
      //   data.map((obj) => {
      //     cl
      //     return obj;
      //   })
      //)
      /**
       *data is a array with one item
        map thorught that  
       */
      console.log(weatherData);
      setArrData(weatherData.hourly.slice(0, 4));
    };

    getWeek();
  }, []);

  const cityName = async (e) => {
    if (e.target.closest(".time--city")) return;
    let time;
    let target;
    if (e.target.textContent) {
      setCity(e.target.textContent);
      target = e.target.textContent;
    } else {
      setCity(e.target.alt);
      console.log(e.target);
      target = e.target.alt;
      time = e.target.dataset.time;
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
    getWeather(target.toLowerCase());

    setCityDaily({
      city: target,
      country: country,
      time: time,
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
    setLoader(true);
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
  useEffect(() => {
    console.log(activePage);
  }, [activePage]);
  const [text, setText] = useState("");

  return (
    <>
      {window.addEventListener("resize", checkSize)}
      <div className="bigContainer" style={{ backgroundColor: "#4FA1CA" }}>
        <div className="app-container">
          {showNav ? (
            <Navbar
              dataObj={data}
              setData={genData}
              toggleNav={toggleNav}
              showNav={showNav}
              data={cityData}
              activeF={activeCity}
              cityDaily={cityDaily}
              temp={temp}
              search={search}
              activePage={activePage}
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
              search={search}
              dataObj={data}
              setData={genData}
              toggleNav={toggleNav}
              showNav={showNav}
              data={cityData}
              activeF={activeCity}
              cityDaily={cityDaily}
              temp={temp}
              activePage={activePage}
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
                className="justify-content-between align-items-center forehead"
                style={{ width: "95%", height: "20%" }}
              >
                <div className="box">
                  <form
                    action=""
                    onSubmit={async (e) => {
                      e.preventDefault();

                      let { data } = await axios.get(
                        "https://api.openweathermap.org/data/2.5/weather",
                        {
                          params: {
                            q: text,
                            appid: key,
                            units: "imperial",
                          },
                        }
                      );
                      setTemp({
                        temp: data.main.temp,
                        humidity: data.main.humidity,
                        wind: data.wind.speed,
                        icon: "https://img.icons8.com/office/p50/000000/rainbow.png",
                      });
                      const c = getCountry(data.coord.lat, data.coord.lon);
                      setCityDaily({
                        city: data.name,
                        country: await c,
                      });

                      setCityData(
                        cityData.map((curr) => {
                          return { ...curr, active: false };
                        })
                      );

                      setLoader(true);
                      setCity(text);
                      setText("");
                    }}
                  >
                    <input
                      placeholder="search any city"
                      type="text"
                      className="input"
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                    />
                  </form>

                  <ImSearch className="glass" />
                </div>
                <div className="icon">
                  <div className="dropdown-row">
                    <div className="icon-pic">
                      <img src={GuestIcon} alt="" />
                    </div>
                    <div className="name">Guest</div>
                    <div className="dropdown">
                      <RiArrowDropDownLine style={{ fontSize: "40px" }} />
                      <div className="dropdown-links">
                        <p className="dropdown-text" onClick={signout}>
                          Sign out
                        </p>
                      </div>
                    </div>
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
                        loader={loader}
                        chart={chart}
                        chartToggle={() => setChart(!chart)}
                        miniData={miniCardData}
                        arr={arrData}
                        city={city}
                        active={activePage}
                      />
                    ) : (
                      <HourlySlider
                        chart={chart}
                        chartToggle={() => setChart(!chart)}
                        miniData={miniCardData}
                        arr={arrData}
                        city={city}
                        loader={loader}
                        active={activePage}
                        currSlide={currSlide}
                        setCurrSlide={(val) => {
                          setCurrSlide(val);
                        }}
                      />
                    );
                  }}
                />
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

export default Dashboard;
