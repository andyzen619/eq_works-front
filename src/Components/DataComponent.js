import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-charts";

const DataComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [graphData, setGraphData] = useState();

  useEffect(() => {

    const translateData = dataArr => {
      let result = [];
      dataArr.forEach((data, index) => {
        let resultData = [];
        resultData.push(index);
        resultData.push(data.events);
        result.push(resultData);
      });
      return result;
    };

    axios
      .get("/events/hourly")
      .then(res => {
        const formattedApiData = translateData(res.data);
        console.log(formattedApiData);
        setApiData(formattedApiData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const data = React.useMemo(
    () => [
      {
        label: "Api Data",
        // data: [
        //   [0, 1],
        //   [1, 2],
        //   [2, 4],
        //   [3, 2],
        //   [4, 7]
        // ]

        data: apiData
      },
      {
        label: "Series 2",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4]
        ]
      }
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  debugger;

  const lineChart = (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <div
      style={{
        width: "400px",
        height: "300px"
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );

  return lineChart;
};

export default DataComponent;
