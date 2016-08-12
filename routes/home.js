const router = require('express').Router();
const { getAppointments, getAllNeedNotes } = require('../models/patient');


router.get('/', getAppointments, getAllNeedNotes, function(req,res) {
  console.log('Route allNeedNotes: ',res.allNeedNotes);
  res.render('index', {user: req.session.user, patientObject: res.patientObject, allNeedNotes: res.allNeedNotes});
})

module.exports = router;
