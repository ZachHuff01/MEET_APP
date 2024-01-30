import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { useEffect, useState, useCallback } from 'react';
import './App.css';


const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [setErrorAlert] = useState('');

// wrap the definition of 'fetchData' in its own useCallback() Hook

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
    fetchData();
}, [currentCity, currentNOE, fetchData]);



// useEffect(() => {
//   fetchData();
// }, [currentCity, currentNOE]);

// const fetchData = async () => {
//   const allEvents = await getEvents();

//    let filteredEvents = currentCity === "See all cities" ?
//     allEvents :
//     allEvents.filter(event => event.location === currentCity)

//   setEvents(filteredEvents.slice(0, currentNOE));
//   setAllLocations(extractLocations(allEvents));
// }



  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <EventList events={events} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />

    </div>
  );
 }
 
 export default App;
 
