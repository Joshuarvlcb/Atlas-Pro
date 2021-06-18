import moment from "moment-timezone";
import timeZone from "city-timezones";
import axios from "axios";

const Cards = ({ activeF, data }) => {
  const getOffset = (time) => {
    const offSet = moment.tz(time).utcOffset();
    console.log(offSet);
    return offSet / 80;
  };
  const getTimeZone = (city) => {
    const [tz] = timeZone.lookupViaCity(city);
    if (!tz) return;
    const { timezone } = tz;
    return timezone;
  };
  const currentTime = (city) => {
    const date = new Date();
    // prettier-ignore
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

    const offSet = Math.abs(getOffset(getTimeZone(city)));
    console.log(offSet);
    // prettier-ignore
    let time = new Date(utcTime + (3600000* offSet));
    console.log(time, city);
    return time;
  };

  // const getApiTime = async (city) => {
  //   const {
  //     data: { datetime },
  //   } = await axios.get(`http://worldtimeapi.org/api/${getTimeZone(city)}`);
  //   return datetime;
  // };
  const time = (city, locale) => {
    let times = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(currentTime(city));
    return times;
  };

  return (
    <>
      {data.map((curr, i) => {
        return (
          <div
            className={curr.active ? "activeCity city-card" : " city-card"}
            onClick={activeF}
            style={{
              padding: "0px",
              cursor: "pointer",
              transition: "all ease-in .3s",
              width: "20%",
              position: "relative",
            }}
            key={`card${i}`}
          >
            <div className=" time--city">{time(curr.name, curr.locale)}</div>

            <img
              src={curr.src}
              width="100%"
              alt={curr.name}
              data-time={time(curr.name, curr.locale)}
              style={{
                borderRadius: "15px",
                marginBottom: "5px",
                height: "140px",
              }}
            />

            <div style={{ fontWeight: "500", textAlign: "center" }}>
              {curr.name}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Cards;
