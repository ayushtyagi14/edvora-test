import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { BsFilterLeft } from "react-icons/bs";
import Popup from "reactjs-popup";
import { UserValue } from "../context/UserContext";

export default function Rides() {
  const [value, setValue] = useState(1);
  const data = UserValue();
  const { rides } = data;
  const { user } = data;

  const date = new Date(2022, 2, 8);

  function nearbyRidesData(arr) {
    let ans = [];
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      let min = Math.abs(user.station_code - item.station_path[0]);
      let minIdx = 0;
      for (let j = 0; j < item.station_path.length; j++) {
        const diff = Math.abs(user.station_code - item.station_path[j]);
        if (diff <= min) {
          min = diff;
          minIdx = j;
        }
      }
      ans.push({ ...item, minIdx, minValue: min });
    }
    ans.sort((a, b) => {
      return a.minValue > b.minValue;
    });
    return ans;
  }

  const getDataForTab = (value) => {
    if (value === 1) {
      const filteredData = rides.filter((item) => {
        const presentMonth = date.getMonth() + 1;
        const rideMonth = parseInt(item.date.slice(0, 2));
        return presentMonth === rideMonth;
      });
      const myArr = nearbyRidesData(filteredData);
      for (let index = 0; index < myArr.length; index++) return myArr;
    } else if (value === 2) {
      const filteredData = rides.filter((item) => {
        const presentMonth = date.getMonth() + 1;
        const rideMonth = parseInt(item.date.slice(0, 2));
        return rideMonth > presentMonth;
      });
      return filteredData;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabRideData = getDataForTab(value);

  return (
    <Box>
      <div className="filters-container">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          className="filters-left"
        >
          <div>
            <Tab value={1} label="Nearest rides" className="filters-item" />
            <Tab
              value={2}
              label={`Upcoming rides (2)`}
              className="filters-item"
            />
            <Tab value={3} label="Past rides (3)" className="filters-item" />
          </div>
        </Tabs>
        <div className="filters-item right">
          <BsFilterLeft />
          <Popup
            trigger={<div className="filter-right">Filter</div>}
            position="bottom center"
          >
            <div className="filter-popup">
              <div className="title">Filter</div>
              <hr />
              <div className="state">State</div>
              <div className="state">City</div>
            </div>
          </Popup>
        </div>
      </div>
      <div>
        {tabRideData.length > 0 &&
          tabRideData.map((item) => {
            return (
              <Box key={item.id} className="ride">
                <img alt="map" src={item.map_url} className="ride-image" />
                <Box className="ride-data">
                  <Typography sx={{}}>Ride id: {item.id}</Typography>
                  <Typography sx={{}}>
                    Origin Station: {item.origin_station_code}
                  </Typography>
                  <Typography sx={{}}>
                    station_path: {item.station_path}
                  </Typography>
                  <Typography sx={{}}>Date: {item.date}</Typography>
                  <Typography sx={{}}>Distance: {"DISTANCE"}</Typography>
                </Box>
                <Box className="ride-location">
                  <button className="location-button">{item.city}</button>
                  <button className="location-button">{item.state}</button>
                </Box>
              </Box>
            );
          })}
      </div>
    </Box>
  );
}
