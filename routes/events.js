const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventsController');

// Get all events
router.get('/', eventController.getAllEvents);

// Get an event by ID
router.get('/:id', eventController.getEventById);

// Create a new event
router.post('/', eventController.createEvent);

module.exports = router;
