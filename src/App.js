import React from 'react';
import './App.css';
import DataComponent from "./Components/APIDataCharts/EventsHourlyComponent";
import PoiComponent from "./Components/APIDataCharts/PoiComponent";
import EventsDailyComponent from "./Components/APIDataCharts/EventsDailyComponent";
import StatsDailyComponent from "./Components/APIDataCharts/StatsDailyComponent";
import StatsHourlyComponent from "./Components/APIDataCharts/StatsHourlyComponent";

function App() {
  return (
    <div className="App">
      <DataComponent/>
      <PoiComponent/>
      <EventsDailyComponent/>
      <StatsDailyComponent/>
      <StatsHourlyComponent/>
    </div>
  );
}

export default App;
