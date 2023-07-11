import mongoose from 'mongoose'

const flightSchema = mongoose.Schema({
  arrCity: String,
  arrAirport: String,
  arrTerminal: String,
  arrDate: String,
  arrTime: String,
  depCity: String,
  depAirport: String,
  depTerminal: String,
  depDate: String,
  depTime: String,
  name: {
    type: [String],
    default: []
  },
  minPrice: Number,
  discount: Number,
  increasing: Boolean
})

const Flight = mongoose.model('Flight', flightSchema)

export default Flight