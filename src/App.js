import CitySearch from './components/CitySearch';
import CityEventsChart from './components/CityEventsChart';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { useEffect, useState, useCallback } from 'react';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
 

// wrap the definition of 'fetchData' in its own useCallback Hook
  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();

    let filteredEvents =
        currentCity === 'See all cities'
            ? allEvents
            : allEvents.filter(event => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
}, [currentCity, currentNOE]);

useEffect(() => {
  if (navigator.onLine) {
    setWarningAlert("");
  } else {
    setWarningAlert("You have gone offline, events are loaded from cache!")
  }
    fetchData();
}, [currentCity, currentNOE, fetchData]);


return (
  <div className="App">
    <h1>Meet App</h1>
    <div className="alerts-container">
      {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
      {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
      {warningAlert.length ? <WarningAlert text={warningAlert}/> :null}
    </div>
    <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
    <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert}/>
    <CityEventsChart allLocations={allLocations} events={events} />
    <EventList events={events} />
  </div>
  );
 };
 
 export default App;
