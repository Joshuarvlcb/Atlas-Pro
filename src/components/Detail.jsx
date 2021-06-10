import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Detail = ({ activePage, chartToggle, chart }) => {
  return (
    <div className="details " style={{ marginRight: "20px" }}>
      <h5>
        {chart ? (
          <Link to="/chart" onClick={chartToggle}>
            Details more <FaArrowRight style={{ marginLeft: "0px" }} />
          </Link>
        ) : (
          <Link to="/slider" onClick={chartToggle}>
            Back to {activePage} <FaArrowRight style={{ marginLeft: "0px" }} />
          </Link>
        )}
      </h5>
    </div>
  );
};
export default Detail;
