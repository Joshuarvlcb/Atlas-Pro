import { Nav } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
const NavLinks = ({
  activePage,
  name,
  logo,
  dataObj,
  setData,
  setActive,
  city,
}) => {
  const getCoords = async (query) => {
    let { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: query,
          appid: "fc628e265dd36f7b1b6b58fe603edde8",
          units: "imperial",
        },
      }
    );

    return [data.coord.lat, data.coord.lon];
  };
  useEffect(() => {
    const activeD = async () => {
      const [lat, lon] = await getCoords(city.city);
      let { data: weatherData } = await axios.get(
        "https://api.openweathermap.org/data/2.5/onecall",
        {
          params: {
            lat: lat,
            lon: lon,
            appid: "fc628e265dd36f7b1b6b58fe603edde8",
            units: "imperial",
          },
        }
      );
      let helper = () => {
        if (activePage.toLowerCase() === "today")
          return [
            weatherData.hourly[0],
            weatherData.hourly[8],
            weatherData.hourly[12],
            weatherData.hourly[18],
          ];
        if (activePage.toLowerCase() === "daily")
          return weatherData.daily.slice(0, 7);

        if (activePage.toLowerCase() === "hourly") return weatherData.hourly;
      };
      let arr = {};
      let n = activePage.toLowerCase();
      dataObj.map((obj) => {
        for (let key in obj) {
          if (key === n.toLowerCase()) {
            arr[n] = helper();
          } else {
            arr[n] = helper();
          }
        }
      });

      setData(arr, activePage);
    };
    setTimeout(() => {
      activeD();
    }, 1500);
  }, [activePage, city]);

  return (
    <Nav.Item>
      <Nav.Link
        onClick={() => {
          setActive(name.toLowerCase());
          setData(undefined, undefined, true);
        }}
        style={{
          color: "white",
          fontWeight: "600",
          fontSize: "17px",
        }}
        className={"d-flex    align-items-center  activeTab "}
      >
        {logo} {name}
      </Nav.Link>
    </Nav.Item>
  );
};
export default NavLinks;
