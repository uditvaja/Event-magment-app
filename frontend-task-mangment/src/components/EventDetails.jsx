import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../utils/axios';
import './EventDetails.css'; // Import custom CSS for additional styling

const EventDetails = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);

  const fetchEventDetails = async () => {
    try {
      const response = await API.get(`/events/${id}`);
      setEvent(response.data);
      console.log('Event details:', response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  if (!event) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5 event-details-container">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img
            src={event.image}
            alt={event.title}
            className="img-fluid event-image rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-5">{event.title}</h1>
          <p className="lead">{event.description}</p>
          <ul className="list-unstyled">
            <li className="event-info">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </li>
            <li className="event-info">
              <strong>Location:</strong> {event.location}
            </li>
            <li className="event-info">
              <strong>Max Attendees:</strong> {event.maxAttendees}
            </li>
            <li>
            
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
