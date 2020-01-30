import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const EventsDailyComponent = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const translateData = dataArr => {
      const result = {};
      dataArr.forEach((data, index) => {
        const dataObj = {};
        dataObj.events = Number(data.events);
        dataObj.index = `Day: ${index}`;
        console.log(dataObj);

        setApiData(prevState => [...prevState, dataObj])
      });
      return result;
    };

    axios
      .get("/events/daily")
      .then(res => {
        console.log(res.data);
        translateData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const chart = (
    <LineChart width={800} height={400} data={apiData}>
      <Line type="monotone" dataKey="events" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="index" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return chart;
};

export default EventsDailyComponent;
