import React, { useEffect, useState } from "react";
import axios from "axios";
import { GMap } from "primereact/gmap";
import { Grid, Menu, Segment } from "semantic-ui-react";

const MapComponent = () => {
  const [apiPoiData, setApiPoiData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 43.6532,
    lng: -79.3832
  });
  const [zoom, setZoom] = useState(12);

  const [activeItem, setActiveItem] = useState("Sunday");

  const google = window.google;
  const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const updateZoom = () => {
    
  }

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

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const calculateIntensity = (day, id) => {
    const dayIndex = daysOfTheWeek.indexOf(day);
    const events = apiData[dayIndex][id];
    return events * 300
  }

  const mapOptions = () => {
    return {
      center: defaultCenter,
      zoom: zoom
    };
  };

  const overlays = () => {
    if(apiPoiData.length > 0){
      return [
        new google.maps.Marker({
          position: { lat: apiPoiData[0].lat, lng: apiPoiData[0].lon },
          title: `${apiPoiData[0].name} events: ${calculateIntensity(activeItem, apiPoiData[0].poi_id)/100}`
        }),
        new google.maps.Circle({center: {lat: apiPoiData[0].lat, lng: apiPoiData[0].lon}, fillColor: '#8884d8', fillOpacity: 0.35, strokeWeight: 1, radius: calculateIntensity(activeItem, apiPoiData[0].poi_id)}),
        new google.maps.Marker({
          position: { lat: apiPoiData[1].lat, lng: apiPoiData[1].lon },
          title: `${apiPoiData[1].name} events: ${calculateIntensity(activeItem, apiPoiData[1].poi_id)/100}`
        }),
        new google.maps.Circle({center: {lat: apiPoiData[1].lat, lng: apiPoiData[1].lon}, fillColor: '#82ca9d', fillOpacity: 0.35, strokeWeight: 1, radius: calculateIntensity(activeItem, apiPoiData[1].poi_id)}),
        new google.maps.Marker({
          position: { lat: apiPoiData[2].lat, lng: apiPoiData[2].lon },
          title: `${apiPoiData[2].name} events: ${calculateIntensity(activeItem, apiPoiData[2].poi_id)/100}`
        }),
        new google.maps.Circle({center: {lat: apiPoiData[2].lat, lng: apiPoiData[2].lon}, fillColor: '#b41e22', fillOpacity: 0.35, strokeWeight: 1, radius: calculateIntensity(activeItem, apiPoiData[2].poi_id)}),
        new google.maps.Marker({
          position: { lat: apiPoiData[3].lat, lng: apiPoiData[3].lon },
          title: `${apiPoiData[3].name} events: ${calculateIntensity(activeItem, apiPoiData[3].poi_id)/100}`
        }),
        new google.maps.Circle({center: {lat: apiPoiData[3].lat, lng: apiPoiData[3].lon}, fillColor: '#d66826', fillOpacity: 0.35, strokeWeight: 1, radius: calculateIntensity(activeItem, apiPoiData[3].poi_id)}),
      ];
    }
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
  
  useEffect(() => {
    axios
      .get("/poi")
      .then(res => {
        // console.log(res.data);
        setApiPoiData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (apiPoiData.length > 0) {
      setDefaultCenter({ lat: apiPoiData[3].lat, lng: apiPoiData[3].lon });
    }
  }, [apiPoiData]);

  return (
    <div>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="Sunday"
              active={activeItem === "Sunday"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Monday"
              active={activeItem === "Monday"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Tuesday"
              active={activeItem === "Tuesday"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Wednesday"
              active={activeItem === "Wednesday"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Thursday"
              active={activeItem === "Thursday"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Friday"
              active={activeItem === "Friday"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Saturday"
              active={activeItem === "Saturday"}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <GMap
              options={mapOptions()}
              overlays={overlays()}
              style={{ width: "100%", minHeight: "320px" }}
              onZoomChanged={updateZoom}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default MapComponent;
