import React, { useEffect, useState } from "react";
import axios from "axios";
import { GMap } from "primereact/gmap";
import { Grid, Menu, Segment } from "semantic-ui-react";

const MapComponent = () => {
  const [apiPoiData, setApiPoiData] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 43.6532,
    lng: -79.3832
  });
  const [activeItem, setActiveItem] = useState("Sunday");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const mapOptions = () => {
    return {
      center: defaultCenter,
      zoom: 12
    };
  };

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
              style={{ width: "100%", minHeight: "320px" }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default MapComponent;
