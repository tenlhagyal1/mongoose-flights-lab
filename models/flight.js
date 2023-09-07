const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const destinationSchema = new Schema({
  airport:{
    type: String,
    enum: ['AUS', 'DFW','DEN','LAX','SAN']
  },
  arrival:{
    type: Date
  }
}, {
  timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest','United','Jetblue']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    flightNo: {
       type: Number,
       required: true, min: 10, max: 9999,
       
    },  
    departs: {
        type: Date,
        default: function() {
          const date = new Date();
          const year = date.getFullYear() + 1;
          return new Date(year, date.getMonth(), date.getDate());
        }
      },
      destinations: [destinationSchema],
      tickets : [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
      }],
    }, {
      timestamps: true
    });

module.exports  = mongoose.model('Flight', flightSchema)