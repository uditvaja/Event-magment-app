import { useState } from 'react';
import API from '../utils/axios';

const EventForm = ({ event = {}, onSuccess }) => {
  const [title, setTitle] = useState(event.title || '');
  const [description, setDescription] = useState(event.description || '');
  const [date, setDate] = useState(event.date || '');
  const [location, setLocation] = useState(event.location || '');
  const [maxAttendees, setMaxAttendees] = useState(event.maxAttendees || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { title, description, date, location, maxAttendees };
    try {
      if (event._id) {
        await API.put(`/events/${event._id}`, formData);
      } else {
        await API.post('/events', formData);
      }
      onSuccess();
    } catch (error) {
      console.log('Event form error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Attendees"
        value={maxAttendees}
        onChange={(e) => setMaxAttendees(e.target.value)}
      />
      <button type="submit">{event._id ? 'Edit' : 'Create'} Event</button>
    </form>
  );
};

export default EventForm;
