import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";

const EventsHourlyComponent = () => {
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
          const objData = {};
          objData.name = `Hour: ${key}`;
          objData.events = formattedApiData[key];

          setApiData(prevState => [...prevState, objData]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const chart = (
    <LineChart width={800} height={400} data={apiData}>
      <Line type="monotone" dataKey="events" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc"/>
      <XAxis dataKey="name" />
      <YAxis/>
      <Tooltip />
    </LineChart>
  );

  return (
    chart
  );
};

export default EventsHourlyComponent;
