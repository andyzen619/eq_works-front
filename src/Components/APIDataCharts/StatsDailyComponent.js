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

const StatsDailyComponent = () => {

  const [apiData, setApiData] = useState([]);
  const [activeChart, setActiveChart] = useState("impressions");

  const handleChartClick = (e, chart) => {
    setActiveChart(chart.name);
  }

  useEffect(() => {
    const translateData = dataArr => {
      const result = {};
      dataArr.forEach((data, index) => {
        const dataObj = {name: '', impressions: 0, clicks: 0, revenue: 0};
        dataObj.impressions = Number(data.impressions);
        dataObj.clicks = Number(data.clicks);
        dataObj.revenue = Number(data.revenue);
        dataObj.name = `Day: ${index}`;

        setApiData(prevState => [...prevState, dataObj]);
      });
      return result;
    };

    axios
      .get("/stats/daily")
      .then(res => {
        translateData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
      <Menu pointing >
        <Menu.Item
          name='impressions'
          active={activeChart === 'impressions'}
          onClick={handleChartClick}
        />
        <Menu.Item
          name='clicks'
          active={activeChart === 'clicks'}
          onClick={handleChartClick}
        />
        <Menu.Item
          name='revenue'
          active={activeChart === 'revenue'}
          onClick={handleChartClick}
        />
      </Menu>
      {Chart}
    </div> 
  )
};

export default StatsDailyComponent;
