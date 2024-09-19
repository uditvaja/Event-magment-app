import React, { useState } from 'react';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('location', location);
        formData.append('maxAttendees', maxAttendees);
        formData.append('image', image); // Image file

        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token here
                },
                body: formData // Using form data to handle file uploads
            });

            const data = await res.json();
            if (res.status === 201) {
                alert('Event created successfully');
            } else {
                alert(data.message || 'Error creating event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="number" placeholder="Max Attendees" value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} required />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} /> {/* Image upload */}
            <button type="submit">Create Event</button>
        </form>
    );
};

export default CreateEvent;
