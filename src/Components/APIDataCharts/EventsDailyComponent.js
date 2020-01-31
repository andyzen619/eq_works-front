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
import { Header } from "semantic-ui-react";

const EventsDailyComponent = () => {
  const [apiData, setApiData] = useState([]);

  const initializeApiData = () => {
    const result = [];
    for(let i = 0; i<7; i++){
      result.push({day: i, 1: 0, 2: 0, 3: 0});
    }
    setApiData(result);
  }



  useEffect(() => {
    initializeApiData();
  }, [])

  useEffect(() => {
    const translateData = dataArr => {

      const newApiData = apiData;
      dataArr.forEach(data => {
        const day = new Date(data.date).getDay();
        const name = data.poi_id;

        const dataObj = apiData[day]
        if(name <= 3 ){
          dataObj[name] += Number(data.events);
          newApiData[day] = dataObj;
        }
      })

      console.log(newApiData);

      setApiData(newApiData);
    };

    for(let i = 1; i <= 4; i ++){
       axios
      .get(`/events/daily/${i}`)
      .then(res => {
        translateData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [apiData]);

  const chart = (
    <LineChart width={600} height={300} data={apiData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="day"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Line type="monotone" dataKey="1" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="2" stroke="#82ca9d" />
       <Line type="monotone" dataKey="3" stroke="#82cf0a" />
      </LineChart>
  );

  return (
    <div style={{padding:'5%'}}>
      <Header as="h3" dividing>
        Daily Events
      </Header>
      {chart}
    </div>
  );
};

export default EventsDailyComponent;
