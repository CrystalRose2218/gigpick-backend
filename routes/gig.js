const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Gig = require('./../models/Gig')
const path = require('path')

// GET- get all Gigs ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  // populate() -> method for including entire document objects within this object
  Gig.find().populate('venue', '_id firstName lastName')
    .then(gigs => {
      // if there are no gig documents
      if(gigs == null){
        return res.status(404).json({
          message: "No gigs found"
        })
      }
      // otherwise return gigs
      res.json(gigs)
    })
    .catch(err => {
      console.log("Error: " + err)
      res.status(500).json({
        message: "Problem getting gigs"
      })
    })  
})

// POST - create new gig --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Gig content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new gig
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new haircut
    let newGig = new Gig({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      venue: req.body.venue,
      image: uniqueFilename,
      time: req.body.time,
      category: req.body.category
    })
  
    newGig.save()
    .then(gig => {        
      // success!  
      // return 201 status with gig object
      return res.status(201).json(gig)
    })
    .catch(err => {
      console.log("Error: " + err)
      return res.status(500).send({
        message: "Problem creating gig!",
        error: err
      })
    })
  })
})

// export
module.exports = router
