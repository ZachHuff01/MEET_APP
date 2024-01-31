import { useEffect, useState, useCallback } from "react";
import { useEffect, useState, useCallback } from "react";
import { useEffect, useState, useCallback } from "react";
import { useEffect, useState, useCallback } from "react";
import { extractLocations, getEvents } from "./api";
import { extractLocations, getEvents } from "./api";
import { extractLocations, getEvents } from "./api";
import { extractLocations, getEvents } from "./api";
import { InfoAlert } from "./components/Alert";
import { InfoAlert } from "./components/Alert";
import { InfoAlert } from "./components/Alert";
import { InfoAlert } from "./components/Alert";
import CitySearch from "./components/CitySearch";
import CitySearch from "./components/CitySearch";
import CitySearch from "./components/CitySearch";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import EventList from "./components/EventList";
import EventList from "./components/EventList";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import NumberOfEvents from "./components/NumberOfEvents";
import NumberOfEvents from "./components/NumberOfEvents";
import NumberOfEvents from "./components/NumberOfEvents";

import { useState, useCallback, useEffect } from 'react';
import { getEvents, extractLocations } from '../api';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

  const handleInputChanged = (event) => {
      const value = event.target.value;

      // Alerts
      let errorText;
      if (value <= 0) {
          errorText = "The number must be higher than 0."
      } else {
          errorText = ""
      }

      setCurrentNOE(value);
      setErrorAlert(errorText);
  };

  return (
      <div id="number-of-events">
          <label htmlFor="number-of-events-input">Number of Events: </label>
          <input 
          type="number"
          id="number-of-events-input"
          className="number-of-events-input"
          defaultValue={32}
          onChange={handleInputChanged}
          />
      </div>
  );
}

export default NumberOfEvents;
export const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [setErrorAlert] = useState('');
  const [infoAlert, setInfoAlert] = useState('');

  // wrap the definition of 'fetchData' in its own useCallback() Hook
  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();

    let filteredEvents = currentCity === 'See all cities'
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE, fetchData]);

  return (
    <div className="App">
      <div className='alerts-container'>
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <EventList events={events} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />

    </div>
  );
};
