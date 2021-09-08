import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "../src/components/table/Table";
import Chart from "../src/components/chart/Chart";

const App = () => {
  const [data, setData] = useState({ Table: [], Chart: [] });

  const getPilot = async (pilot) => {
    const res_P = await axios(pilot);
    const res_p_full = {
      pilot_name: res_P.data.name,
      vehicles: res_P.data.vehicles,
    };
    return res_p_full;
  };

  const getVehicle = async (vehicleLink) => {
    const res_V = await axios(vehicleLink);
    const vehicle_name = res_V.data.name;
    return vehicle_name;
  };

  const populat_per_vehicle = [];
  const planetPopulation = [];
  const getV = async () => {
    let i = 1;
    let next = true;
    const worldList = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];
    while (next) {
      try {
        let url = `https://swapi.dev/api/planets/${i}/`;
        const res = await axios.get(url);
        const worldName = res.data.name;
        const worldPopulation =
          res.data.population !== "unknown" ? res.data.population : 0;
        if (worldList.includes(worldName)) {
          planetPopulation.push({
            name: worldName,
            populate: worldPopulation,
          });
        }
        const pilots_link = res.data.residents;
        for (let p = 0; p < pilots_link.length; p++) {
          const res_pilot = await getPilot(pilots_link[p]);
          const pilotName = res_pilot.pilot_name;
          const vehicleLinks = res_pilot.vehicles;
          for (let v = 0; v < vehicleLinks.length; v++) {
            const vehicleName = await getVehicle(vehicleLinks[v]);
            if (
              populat_per_vehicle.filter(function (e) {
                return e.vehicle_name === vehicleName;
              }).length === 0
            ) {
              populat_per_vehicle.push({
                vehicle_name: vehicleName,
                pilots_names: [pilotName],
                worldnamePopulation: [
                  { name: worldName, population: worldPopulation },
                ],
                total: parseInt(worldPopulation),
              });
            } else {
              const index = populat_per_vehicle
                .map((e) => e.vehicle_name)
                .indexOf(vehicleName);
              populat_per_vehicle[index].pilots_names.push(pilotName);
              populat_per_vehicle[index].worldnamePopulation.push({
                name: worldName,
                population: worldPopulation,
              });

              const sum_Populat = populat_per_vehicle[
                index
              ].worldnamePopulation.reduce(
                (a, b) => parseInt(a) + parseInt(b.population),
                0
              );
              populat_per_vehicle[index].total = sum_Populat;
            }
          }
        }
        i = i + 1;
      } catch (e) {
        console.log(e);
        next = false;
      }
    }
    setData({ Table: populat_per_vehicle, Chart: planetPopulation });
  };

  useEffect(() => {
    getV();
  }, []);

  return (
    <div className="App">
      <Table data={data.Table} />
      <Chart data={data.Chart} />
    </div>
  );
};

export default App;
