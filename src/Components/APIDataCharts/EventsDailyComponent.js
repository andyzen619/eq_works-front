import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label
} from "recharts";
import { Header } from "semantic-ui-react";

const EventsDailyComponent = () => {
  const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [apiData, setApiData] = useState([]);

  /**
   * Sets state given api data query
   * @param {*} dataArr 
   */
  const translateData = dataArr => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      result.push({ 1: 0, 2: 0, 3: 0, 4: 0, day: daysOfTheWeek[i] });
    }

    dataArr.forEach(data => {
      const day = new Date(data.date).getDay();
      const id = data.poi_id;
      const events = Number(data.events);

      result[day][id] += events;
    });

    result.forEach(day => {
      setApiData(prevState => [...prevState, day]);
    })

    
  };

  useEffect(() => {
    axios
      .get(`/events/daily/`)
      .then(res => {
        translateData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "5%" }}>
      <Header as="h3" dividing>
        Daily Events of week: Jan 1 - 15
      </Header>
      <LineChart
        width={730}
        height={250}
        data={apiData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day">
          <Label value="Days of the week" offset={-10}  position= "insideBottomRight"></Label>
        </XAxis>
        <YAxis>
        <Label value="Events" offset={-20}  position= "left"></Label>
        </YAxis>
        <Tooltip />
        <Legend />
        <Line name="EQ Works" type="monotone" dataKey="1" stroke="#8884d8" />
        <Line name="CN Tower" type="monotone" dataKey="2" stroke="#82ca9d" />
        <Line name="Niagara Falls" type="monotone" dataKey="3" stroke="#b41e22" />
        <Line name="Vancouver Harbour" type="monotone" dataKey="4" stroke="#d66826" />
      </LineChart>
    </div>
  );
};

export default EventsDailyComponent;
