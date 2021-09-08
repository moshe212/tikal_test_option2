import React, { useEffect, useState } from "react";
import { Ring } from "react-awesome-spinners";
import "./Table.css";

const Table = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (props.data.length > 0) {
      setLoading(false);
    }
  }, [props]);

  let maxObj = props.data.reduce(
    (max, obj) => (max.total > obj.total ? max : obj),
    0
  );

  if (!loading) {
    return (
      <div className="table">
        <h2>Table</h2>

        <table>
          <tbody>
            <tr>
              <td>Vehicle name with the largest sum</td>
              <td>{maxObj.vehicle_name}</td>
            </tr>
            <tr>
              <td>Related home planets and their respective population</td>
              <td>
                {maxObj.worldnamePopulation.map(
                  (obj) => obj.name + " : " + obj.population + " "
                )}
              </td>
            </tr>
            <tr>
              <td>Related pilot names</td>
              <td>
                {maxObj.pilots_names.map((x) =>
                  maxObj.pilots_names.length > 1 ? x + " , " : x
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <h2>Table Loading...</h2>
        <Ring />
      </div>
    );
  }
};

export default Table;
