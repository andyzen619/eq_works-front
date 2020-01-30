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
import {Menu} from 'semantic-ui-react';

const StatsHourlyComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [activeChart, setActiveChart] = useState("impressions");

  const handleChartClick = (e, chart) => {
    setActiveChart(chart.name);
  };

  const initializeApiData = () => {
    let result = [];
    for(let i = 0; i < 24; i ++){
      const objData = {
        name: `Hour ${i}`,
        impressions: 0,
        clicks: 0,
        revenue: 0
      }

    result.push(objData); 
    }
    return result;
  }


  useEffect(() => {

    const translateData = (dataArr, newApiData) => {
      dataArr.forEach((data, index) => {
        let hour = data.hour;
        const newDataObj = newApiData[hour];
        newDataObj.impressions += data.impressions;
        newDataObj.clicks += data.clicks;
        newDataObj.revenue += Number(data.revenue);
        
        newApiData[hour] = newDataObj;
      });
      setApiData(newApiData);
    };

    axios
      .get("/stats/hourly")
      .then(res => {
        translateData(res.data, initializeApiData());
      })
      .catch(err => {
        console.log(err);
      });
  }, [setApiData]);

  const Chart = (
    <div>
      <LineChart width={800} height={400} data={apiData}>
        {/* <Line type="monotone" dataKey="impressions" stroke="#8884d8" /> */}
        {/* <Line type="monotone" dataKey="clicks" stroke="#6664d8" /> */}
        <Line type="monotone" dataKey={activeChart} stroke="#2224d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );

  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name="impressions"
          active={activeChart === "impressions"}
          onClick={handleChartClick}
        />
        <Menu.Item
          name="clicks"
          active={activeChart === "clicks"}
          onClick={handleChartClick}
        />
        <Menu.Item
          name="revenue"
          active={activeChart === "revenue"}
          onClick={handleChartClick}
        />
      </Menu>
      {Chart}
    </div>
  );
};

export default StatsHourlyComponent;
