import { useState, useEffect } from 'react';
import API from '../utils/axios';
import EventList from '../components/EventList';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await API.get('/events');
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <EventList events={events} />
    </div>
  );
};

export default Home;
