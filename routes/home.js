const router = require('express').Router();
const { getAppointments, getAllNeedNotes, searchAppointments } = require('../models/patient');


router.get('/', getAppointments, getAllNeedNotes, function(req,res) {
  console.log('Route allNeedNotes: ',res.allNeedNotes);
  res.render('index', {user: req.session.user, patientObject: res.patientObject, allNeedNotes: res.allNeedNotes});
})

router.get('/searchday', searchAppointments, function(req,res) {
  res.json({user: req.session.user, searchedAppts: res.searchedAppts})
})

module.exports = router;
