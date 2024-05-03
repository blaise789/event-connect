// Assuming you have an Express router set up

const express = require('express');
const router = express.Router();
const Ticket = require('../Models/ticket');

// POST route for creating tickets
router.post('/tickets', async (req, res) => {
  try {
    const { event, user, ticketType, seatArea, price } = req.body;

    // Validate ticket data (e.g., check if event exists, user exists, etc.)

    // Create a new Ticket instance
    const newTicket = new Ticket({
      event,
      user,
      ticketType,
      seatArea,
      price,
    });

    // Save the ticket to the database
    await newTicket.save();

    res.status(201).json({ success: true, message: 'Ticket created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
