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

    console.log([data.coord.lat, data.coord.lon]);
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
        return activePage.toLowerCase() === "today"
          ? weatherData.hourly.slice(0, 4)
          : weatherData.daily.slice(0, 7);
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
      console.log(activePage);
      console.log(weatherData.hourly.slice(0, 4));
      console.log(arr[activePage]);
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
        }}
        className={"d-flex    align-items-center  activeTab "}
      >
        {logo} {name}
      </Nav.Link>
    </Nav.Item>
  );
};
export default NavLinks;
