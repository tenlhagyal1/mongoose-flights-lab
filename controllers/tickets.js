const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    createTicket,
    newTicket
}

async function createTicket(req, res) {
    const { seat, price, flight } = req.body;
    try {
        const ticket = await Ticket.create({ seat, price, flight });
        console.log('Created Ticket:', ticket);
        const flightToUpdate = await Flight.findById(flight);
        flightToUpdate.tickets.push(ticket);
        await flightToUpdate.save();
        res.redirect(`/flights/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating ticket');
    }
}

function newTicket(req, res) {
    res.render('tickets/new', { flightId: req.params.id });
  }