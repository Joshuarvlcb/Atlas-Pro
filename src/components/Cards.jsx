const Cards = ({ activeF, data }) => {
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
              transition: "all ease .3s",
              width: "20%",
            }}
            key={`card${i}`}
          >
            <img
              src={curr.src}
              width="100%"
              alt={curr.name}
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
