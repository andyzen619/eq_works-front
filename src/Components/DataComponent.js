import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Chart } from "react-charts";

const DataComponent = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const translateData = dataArr => {
      const result = {};
      dataArr.forEach(data => {
        const hour = data.hour;
        if (!(hour in result)) {
          result[hour] = data.events;
        } else {
          result[hour] += data.events;
        }
      });
      return result;
    };

    axios
      .get("/events/hourly")
      .then(res => {
        const formattedApiData = translateData(res.data);
        Object.keys(formattedApiData).forEach(key => {
          const dataObject = [];
          dataObject.push(Number(key));
          dataObject.push(formattedApiData[key]);
          const newApiState = apiData;
          apiData.push(dataObject);
          setApiData(newApiState);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const data = useMemo(
    () => [
      {
        label: "Series 1",
        data: apiData
      },
      {
        label: "Series 2",
        data: [
          [0, 55],
          [1, 22],
          [2, 40],
          [4, 5]
        ]
      }
    ],
    [apiData]
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    [apiData]
  );
  
  console.log(data);
  return (
    <div
      style={{
        width: "1000px",
        height: "1000px"
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
};

export default DataComponent;
