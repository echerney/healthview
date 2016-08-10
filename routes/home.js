const router = require('express').Router();
const { sortPatients } = require('../models/patient');


router.get('/', sortPatients, function(req,res) {
  res.render('index', {user: req.session.user, patientObject: res.patientObject});
})

module.exports = router;
