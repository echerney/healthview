const router = require('express').Router();
const { createPatient, findPatient, searchPatients, addAppointment } = require('../models/patient');

const errorHandler = function(err, req, res, next){
  console.log(err.stack);
  res.status(404).render('index')
}

router.get('/search', searchPatients, (req,res)=>{
  res.json({patients: res.foundPatients})
})

// router.delete('/:id', function(req,res){
//   //gets rid of one patient
// })

router.get('/new', function(req,res) {
  res.render('patient/new', {user: req.session.user})
}, errorHandler)

router.post('/new', createPatient, function(req,res) {
  res.redirect('../')
}, errorHandler)

router.get('/:id', findPatient, function(req,res) {
  res.render('patient/patientview', {patientInfo: res.patientInfo, user: req.session.user} )
}, errorHandler)

router.put('/:id', addAppointment, function(req,res) {
  res.send('complete');
}, errorHandler)

module.exports = router;
