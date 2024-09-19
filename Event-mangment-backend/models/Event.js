const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Event', EventSchema);
