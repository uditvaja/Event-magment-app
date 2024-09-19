const express = require('express');
const { createEvent, getEvents, getEventById,updateEvent,deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', protect, upload.single('image'), createEvent);

router.get('/', getEvents);
router.get('/:id', getEventById);

// PUT update an event
router.put('/:id', updateEvent);

// DELETE an event
router.delete('/:id', deleteEvent);


module.exports = router;
