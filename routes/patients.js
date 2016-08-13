const router = require('express').Router();
const { createPatient, findPatient, searchPatients, addAppointment, checkPatientIn, getAllNotes, addNote} = require('../models/patient');

const errorHandler = function(err, req, res, next){
  console.log(err.stack);
  res.status(404).render('index')
}

router.get('/search', searchPatients, function(req,res) {
  res.json({patients: res.foundPatients})
})

// router.delete('/:id', function(req,res){
//   //gets rid of one patient
// })

router.put('/addnote', addNote, function(req, res) {
  res.json({note: 'note added', user: req.session.user})
}, errorHandler)

router.get('/new', function(req,res) {
  res.render('patient/new', {user: req.session.user})
}, errorHandler)

router.post('/new', createPatient, function(req,res) {
  res.redirect('../')
}, errorHandler)

router.put('/checkin', checkPatientIn, function(req, res) {
  res.send('checked in');
}, errorHandler)

router.get('/:id', findPatient, function(req,res) {
  res.render('patient/patientview', {patientInfo: res.patientInfo, user: req.session.user} )
}, errorHandler)

router.put('/:id', addAppointment, function(req,res) {
  res.send('appointment added');
}, errorHandler)

module.exports = router;
