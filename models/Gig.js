const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const gigSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true    
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  venue: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  image: {
    type: String   
  },
  category: {
    type: Array
  },
  Applicants: {
    type: Array
  },
  isCovered: {
    type: Boolean,
    default: false
  }
  
}, { timestamps: true })


// model
const gigModel = mongoose.model('Gig', gigSchema)

// export
module.exports = gigModel
