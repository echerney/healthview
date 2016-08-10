const router = require('express').Router();
const { createPatient } = require('../models/patient');

router.get('/:id', function(req,res){
  res.send(req.params.id)
})

// router.put('/:id', function(req,res){
//   //edit that user, will be on the submit on the user page
// })

// router.delete('/:id', function(req,res){
//   //gets rid of one patient
// })

router.get('/new', function(req,res) {
  res.render('patient/new', {user: req.session.user})
})

router.post('/new', createPatient, function(req,res){
  res.redirect('../')
})

module.exports = router;
