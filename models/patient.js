const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/healthview';

function createPatient(req, res, next) {
  console.log(req.session.user)
  MongoClient.connect(dbConnection, function(err, db) {
    let patientInfo = {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      race: req.body.race,
      practitioner: req.session.user.name,
      diagnosis: req.body.diagnosis,
      needsNotes: false,
      appointments: [],
      notes: []
    }
    db.collection('patients').insertOne(patientInfo, function(err,result) {
      if (err) throw err;
      console.log(result)
      next()
    })
  })
}

module.exports = { createPatient }
