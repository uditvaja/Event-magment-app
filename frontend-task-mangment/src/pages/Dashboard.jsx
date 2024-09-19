import { useEffect, useState } from 'react';
import API from '../utils/axios';
import EventForm from '../components/EventForm';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  const fetchMyEvents = async () => {
    const { data } = await API.get('/events/mine');
    setEvents(data);
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div>
      <h1>My Events</h1>
      <EventForm onSuccess={fetchMyEvents} />
      <div>
        {events.map((event) => (
          <div key={event._id}>
            <h3>{event.title}</h3>
            <button onClick={() => API.delete(`/events/${event._id}`).then(fetchMyEvents)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
