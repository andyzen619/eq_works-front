import React, { useEffect, useState } from "react";
import axios from "axios";

const PoiComponent = () => {

  useEffect(() => {
    axios
      .get("/poi")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (<div></div>);
}

export default PoiComponent;