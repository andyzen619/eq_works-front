import React from 'react';
import './App.css';
import PoiComponent from "./Components/APIDataCharts/PoiComponent";
import EventsDailyComponent from "./Components/APIDataCharts/EventsDailyComponent";
import StatsDailyComponent from "./Components/APIDataCharts/StatsDailyComponent";
import StatsHourlyComponent from "./Components/APIDataCharts/StatsHourlyComponent";
import EventsHourlyComponent from './Components/APIDataCharts/EventsHourlyComponent';
import MapComponent from "./Components/MapComponents/MapComponent";

function App() {
  return (
    <div className="App" style={{}}>
      {/* <EventsHourlyComponent/> */}
      <EventsDailyComponent/>
      {/* <StatsDailyComponent/> */}
      {/* <StatsHourlyComponent/> */}
      <MapComponent/>
    </div>
  );
}

export default App;
