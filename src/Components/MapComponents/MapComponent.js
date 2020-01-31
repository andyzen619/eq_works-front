import React, { useEffect, useState } from "react";
import axios from "axios";
import { GMap } from "primereact/gmap";
import {} from "semantic-ui-react";

const MapComponent = () => {
  const [apiPoiData, setApiPoiData] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({lat: 43.6532, lng: -79.3832});

  const mapOptions = () => {
    // console.log(defaultCenter);

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
    if(apiPoiData.length > 0){
      setDefaultCenter({lat: apiPoiData[3].lat, lng: apiPoiData[3].lon}); 
    }
  }, [apiPoiData])

  return (
    <div>
      <GMap
        options={mapOptions()}
        style={{ width: "100%", minHeight: "320px" }}
      />
    </div>
  );
};

export default MapComponent;
