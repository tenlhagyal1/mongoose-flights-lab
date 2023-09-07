const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

router.post('/flights/:id/', ticketsCtrl.createTicket);

router.get('/flights/:id/tickets/new', ticketsCtrl.newTicket);

module.exports = router