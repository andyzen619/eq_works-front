import React, { useEffect, useState } from "react";
import axios from "axios";

const DataComponent = () => {
  axios
    .get("/events/hourly")
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });

  return <div>Hello world!</div>;
};

export default DataComponent;
