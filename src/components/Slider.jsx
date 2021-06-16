import React, { useEffect } from "react";
import MiniCard from "./MiniCard";
import Detail from "./Detail";

const Slider = ({
  arr,
  city,
  active,
  miniData,
  chartToggle,
  chart,
  loader,
}) => {
  const getIcon = function (id) {
    switch (id) {
      case "01n":
        return "sun--v2.png";
      case "01d":
        return "moon.png";
      case "02d":
        return "partly-cloudy-day--v2.png";
      case "04d":
        return "sun--v2.png";
      case "02n":
        return "partly-cloudy-night--v1.png";
      case "10d":
        return "light-rain.png";
      case "03n":
        return "partly-cloudy-day--v2.png";
    }
  };
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = ["Morning", "Noon", "Evening", "Night"];
  useEffect(() => {
    console.log(active);
  }, [arr]);

  return (
    <div className="slider">
      <div className=" d-flex justify-content-around align-items-center  chart_h3">
        <h3
          style={{
            paddingBottom: "20px",
            paddingLeft: "20px",
          }}
        >
          {city}
        </h3>
        <Detail
          className=".chart_h3"
          activePage={active}
          chartToggle={chartToggle}
          chart={chart}
        />
      </div>
      <div className="daily-slider">
        {loader ? (
          <div class="loader"></div>
        ) : (
          arr.map((card, i) => {
            return (
              <MiniCard
                key={`weather${i}`}
                arr={arr}
                miniData={miniData}
                pic={`https://img.icons8.com/office/50/000000/${getIcon(
                  card.weather[0].icon
                )}`}
                className={`${active}${i}`}
                page={active}
                temp={
                  active == "today" ? String(card["temp"]) : card["temp"]["day"]
                }
                daily={{
                  h: card.humidity,
                  t: card.temp.day,
                  day: [days[i]],
                  w: card.wind_speed,
                }}
                text={active === "daily" ? days[i] : times[i]}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Slider;
