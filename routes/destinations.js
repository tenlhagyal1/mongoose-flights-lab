const express = require('express')
const router = express.Router()
const destinationsCtrl =require ('../controllers/destinations')

router.post('/flights/:id/destination', destinationsCtrl.create)


module.exports = router