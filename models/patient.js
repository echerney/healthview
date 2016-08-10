const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/healthview';

function createPatient(req, res, next) {
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

function sortPatients(req, res, next) {
  if (!req.session.user) {
    console.log('yo, gotta log in first')
    next();
  } else {
    let practitioner = req.session.user.name;
    console.log(practitioner);
    MongoClient.connect(dbConnection, function(err, db) {
      db.collection('patients')
        .find({practitioner: practitioner})
        .toArray(function(err, data){
          if (err) throw err
          console.log(data.length)
          res.patientObject = data
          next();
      });
    })
  }
}

function findPatient(req, res, next) {
  if (!req.session.user) {
    console.log('yo, gotta log in!')
    next();
  } else {
    let patientID = 'ObjectId("' + req.params.id + '")';
    console.log(patientID)
    MongoClient.connect(dbConnection, function(err, db) {
      db.collection('patients')
      .find({"_id" : patientID})
      next();
      // .toArray(function(err, data){
      //     if (err) throw err
      //     console.log(data.length)
      //     res.patientInfo = data
      //     next();
      // });
    })
  }
}

module.exports = { createPatient, sortPatients, findPatient }
