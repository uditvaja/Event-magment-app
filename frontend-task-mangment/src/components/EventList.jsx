import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await API.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter((event) => event._id !== id)); // Remove deleted event from state
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Event List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.location}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td style={{justifyContent: 'space-between', display: 'flex' , }}>
                <Link to={`/events/edit/${event._id}`} className="btn btn-warning btn-sm">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="btn btn-danger btn-sm ml-2"
                >
                  Delete
                </button>
                <Link to={`/events/${event._id}`} className="btn btn-primary btn-sm ml-2">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
