const pool = require('../models/db'); // Import the pool object

// Get all events from the database
exports.getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows); // Send all events as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching events');
  }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
  const eventId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM events WHERE event_id = $1', [eventId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the event data
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching event');
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const { event_name, event_date, description, location } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (event_name, event_date, description, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [event_name, event_date, description, location]
    );
    res.status(201).json(result.rows[0]); // Send back the created event
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating event');
  }
};
