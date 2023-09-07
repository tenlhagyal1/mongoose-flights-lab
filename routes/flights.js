var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights')


// all paths start with /flights

router.get('/', flightsCtrl.index)

router.get('/new', flightsCtrl.new)

router.get('/:id',flightsCtrl.show)

router.post('/', flightsCtrl.create)

router.delete('/:id', flightsCtrl.delete)

router.post('/:id/destinations', flightsCtrl.addDestination);

module.exports = router;