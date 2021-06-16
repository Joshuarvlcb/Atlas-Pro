const MiniCard = ({ pic, page, temp, text, miniData, arr, daily, day }) => {
  return (
    <>
      <div
        onClick={() => {
          if (page == "today" || page == "hourly") {
            let clicked = arr.findIndex((obj) => {
              return obj.temp === temp;
            });

            miniData(temp, text, arr.humidity, arr.wind_speed, pic);
            console.log(pic);
          } else if (page == "daily") {
            miniData(daily.t, daily.day, daily.h, daily.w, pic);

            console.log(arr);
          }
        }}
        className="mini-card "
        style={{
          cursor: "pointer",
          width: "120px",
          position: "relative",
          fontFamily: "Quicksand, sans-serif",
          fontWeight: "bolder",
        }}
      >
        <div className="d-flex justify-content-center">
          <img
            src={pic}
            width="48px"
            alt=""
            style={{ position: "absolute", top: "8%" }}
          />
        </div>
        <div
          className="d-flex flex-column align-items-center text-container"
          style={{ position: "absolute", top: "50%" }}
        >
          {day !== undefined && <div className="day">{day}</div>}
          <div className="date">{text}</div>
          <div className="deg">{temp}°</div>
        </div>
      </div>
    </>
  );
};

export default MiniCard;
