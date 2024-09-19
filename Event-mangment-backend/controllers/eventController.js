const Event = require('../models/Event'); // Make sure the path is correct
const {sendEmail} = require('../emailService');
const User = require('../models/User');
// Create an event
exports.createEvent = async (req, res) => {
    const { title, description, date, location, maxAttendees, image: imageUrl } = req.body;
    const image = req.file ? req.file.path : imageUrl;

    try {
        const event = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            image,
            createdBy: req.user,
        });
        await event.save();

        // Fetch all users
        const users = await User.find({}, 'email');

        // Send email notifications to all users
        users.forEach(async (user) => {
            await sendEmail(
                user.email,
                'New Event Added: ' + title,
                `Hello! A new event "${title}" has been added. Check it out on our platform!`
            );
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get event by ID
exports.getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    const { title, description, date, location, maxAttendees, image: imageUrl } = req.body;
    const image = req.file ? req.file.path : imageUrl;

    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndUpdate(
            eventId,
            { title, description, date, location, maxAttendees, image },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
