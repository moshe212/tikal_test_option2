import React, { useState, useEffect } from "react";
import { Ring } from "react-awesome-spinners";
import "./Chart.css";

const Chart = (props) => {
  const [loading, setLoading] = useState(true);
  const data = props.data;

  useEffect(() => {
    if (props.data.length > 0) {
      console.log("f");
      setLoading(false);
    }
  }, [props]);

  if (!loading) {
    return (
      <div className="Chart">
        <section className="bar-graph bar-graph-vertical bar-graph-two">
          <h2>Chart</h2>

          <div className="bar-one bar-container">
            <div className="bar" data-populate={data[0].populate}></div>
            <span className="planet">Tatooine</span>
          </div>
          <div className="bar-two bar-container">
            <div className="bar" data-populate={data[1].populate}></div>
            <span className="planet">Alderaan</span>
          </div>
          <div className="bar-three bar-container">
            <div className="bar" data-populate={data[2].populate}></div>
            <span className="planet">Naboo</span>
          </div>
          <div className="bar-four bar-container">
            <div className="bar" data-populate={data[3].populate}></div>
            <span className="planet">Bespin</span>
          </div>
          <div className="bar-five bar-container">
            <div className="bar" data-populate={data[4].populate}></div>
            <span className="planet">Endor</span>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <h2>Chart Loading...</h2>
        <Ring />
      </div>
    );
  }
};

export default Chart;
