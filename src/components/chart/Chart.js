import React, { useState, useEffect } from "react";
import { Ring } from "react-awesome-spinners";
import "./Chart.css";

const Chart = (props) => {
  const [loading, setLoading] = useState(true);
  const data = props.data;

  useEffect(() => {
    if (props.data.length > 0) {
      console.log(props.data);
      setLoading(false);
    }
  }, [props]);

  if (!loading) {
    return (
      <div className="Chart">
        <section className="bar-graph bar-graph-vertical bar-graph-two">
          <h2>Chart</h2>
          {data.map((item, itemIndex) => (
            <div className={`bar-${itemIndex} bar-container`} key={itemIndex}>
              <div className="bar" data-populate={item.populate}></div>
              <span className="planet">{item.name}</span>
            </div>
          ))}
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
