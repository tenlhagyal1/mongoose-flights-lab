const Flight = require("../models/flight");
const Ticket = require('../models/ticket')

module.exports = {
  new: newFlight,
  create,
  index,
  delete: deleteFlight,
  show,
  addDestination,

};



async function index(req, res) {
  try {
    const flights = await Flight.find({}).sort({ departs: 'asc' });
    res.render("flights/index", { flights });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    
    const tickets = await Ticket.find({ flight: flight._id }).populate('flight');
    console.log(tickets)
    res.render('flights/show', { title: 'Flight Detail', flight, tickets });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching flight details');
  }
}


function newFlight(req, res) {
  res.render('flights/new' ,{
    errorMsg: ''
     })
  console.log(err)
}

async function create(req, res) {
  try {
      const flight = await Flight.create(req.body);
      res.redirect("/flights");
  } catch (error) {
      if (error.name === 'ValidationError') {
          const errorMsg = 'Please enter a valid flight number between 10 and 9999.';
          res.render('flights/new', { errorMsg });
      } else {
          console.error(error);
          res.status(500).send('Internal Server Error');
      }
  }
}




async function deleteFlight(req, res) {
  const flightId = req.params.id; // Get the flight ID from the URL parameter
  try {
    await Flight.deleteOne({ _id: flightId }); // Use _id to filter and delete
    res.redirect('/flights'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting flight');
  }
}



async function addDestination(req, res){
  const flightId = req.params.id
  const {airport, arrival} =req.body

  try {
    const flight = await Flight.findById(flightId);
    flight.destinations.push({ airport, arrival });
    await flight.save();
    res.redirect(`/flights/${flightId}`); // Redirect back to the flight's show page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding destination');
  }
}