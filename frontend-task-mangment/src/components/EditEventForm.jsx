import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../utils/axios';

const EditEventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        maxAttendees: '',
        image: ''
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await API.get(`/events/${id}`);
                console.log('API response:', response.data); // Log the response
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [id]);

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/events/${id}`, event);
            navigate('/'); // Redirect to event list or another page
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={event.title || ''}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea
                name="description"
                value={event.description || ''}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="date"
                name="date"
                value={event.date || ''}
                onChange={handleChange}
            />
            <input
                type="text"
                name="location"
                value={event.location || ''}
                onChange={handleChange}
                placeholder="Location"
            />
            <input
                type="number"
                name="maxAttendees"
                value={event.maxAttendees || ''}
                onChange={handleChange}
                placeholder="Max Attendees"
            />
            <input
                type="text"
                name="image"
                value={event.image || ''}
                onChange={handleChange}
                placeholder="Image URL"
            />
            <button type="submit">Update Event</button>
        </form>
    );
};

export default EditEventForm;
