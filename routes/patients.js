const router = require('express').Router();
const { createPatient, findPatient } = require('../models/patient');

router.get('/search', (req,res)=>{
  res.json({message: 'yo'})
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

router.get('/:id', findPatient, function(req,res){
  res.render('patient/patientview', {patientInfo: res.patientInfo, user: req.session.user} )
})

module.exports = router;
