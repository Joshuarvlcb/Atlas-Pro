import React from "react";
import MiniCard from "./MiniCard";
import { ImArrowRight2, ImArrowLeft2, ImOffice } from "react-icons/im";
import Detail from "../components/Detail";
import { useState } from "react";

const HourlySlider = ({
  arr,
  city,
  active,
  miniData,
  currSlide,
  setCurrSlide,
  chartToggle,
  chart,
  loader,
}) => {
  const getIcon = function (id) {
    switch (id) {
      case "01n":
        return "moon.png";

      case "01d":
        return "sun--v2.png";
      case "02d":
        return "partly-cloudy-day--v2.png";
      case "04d":
        return "cloud.png";
      case "04n":
        return "cloud.png";
      case "02n":
        return "partly-cloudy-night--v1.png";

      case "03n":
        return "clouds.png";
      case "03d":
        return "clouds.png";
      case "09d":
        return "rain.png";
      case "09n":
        return "rain.png";
      case "10d":
        return "light-rain.png";
      case "10n":
        return "light-rain.png";
      case "11d":
        return "cloud-lighting--v1.png";
      case "11n":
        return "cloud-lighting--v1.png";
      case "13d":
        return "snow.png";
      case "13n":
        return "snow.png";
      case "50d":
        return "fog-day--v1.png";
      case "50n":
        return "fog-night.png";
    }
  };

  const slides = [
    arr.slice(0, 6),
    arr.slice(6, 12),
    arr.slice(12, 18),
    arr.slice(18, 24),
    arr.slice(24, 30),
    arr.slice(30, 36),
    arr.slice(36, 42),
    arr.slice(42),
  ];

  const next = () => {
    setCurrSlide(currSlide === 7 ? 0 : currSlide + 1);
  };

  const back = () => {
    setCurrSlide(currSlide === 0 ? 7 : currSlide - 1);
  };

  const getTime = (i) => {
    if (i === 0) return ["Monday", "12:00AM"];
    if (i < 12) return ["Monday", `${i}:00AM`];
    if (i === 12) return ["Monday", `12:00PM`];
    if (i < 24) return ["Monday", `${i - 12}:00PM`];
    if (i === 24) return ["Tuesday", "12:00AM"];
    if (i < 36) return ["Tuesday", `${i - 24}:00AM`];
    if (i === 36) return ["Tuesday", `12:00PM`];
    if (i < 48) return ["Tuesday", `${i - 36}:00PM`];

    // return [day, i]
  };

  return (
    <div className="slider ">
      <h3
        style={{
          paddingBottom: "20px",
          paddingLeft: "20px",
          width: "269px",
          alignItems: "center",
        }}
      >
        {city}
      </h3>
      <Detail activePage={active} chartToggle={chartToggle} chart={chart} />
      <div className="daily-slider">
        {loader ? (
          <div className="loader"></div>
        ) : (
          slides[currSlide].map((card, i) => {
            const [day, time] = getTime(i + currSlide * 6);
            return (
              <MiniCard
                pic={`https://img.icons8.com/office/50/000000/${getIcon(
                  card.weather[0].icon
                )}`}
                temp={JSON.stringify(card.temp)}
                arr={arr}
                miniData={miniData}
                page={active}
                text={time}
                key={`c${i}]`}
              />
            );
          })
        )}
        <div className="buttonContainer">
          <ImArrowLeft2 onClick={back} />
          <ImArrowRight2 onClick={next} />
        </div>
      </div>
    </div>
  );
};

export default HourlySlider;
