const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/healthview';
const { ObjectId } = require('mongodb')

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
    let today = new Date()
    let dateFormatted = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
    console.log(dateFormatted)
    let practitioner = req.session.user.name;
    console.log(practitioner);
    MongoClient.connect(dbConnection, function(err, db) {
      db.collection('patients')
        .find({practitioner: practitioner, appointments: {$in: [dateFormatted]}})
        .toArray(function(err, data){
          if (err) throw err
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
    let patientID = req.params.id;
    console.log(patientID)
    MongoClient.connect(dbConnection, function(err, db) {
      db.collection('patients')
      .findOne({_id : ObjectId(patientID)},
        function(err, data){
          if (err) throw err
          console.log(data)
          res.patientInfo = data
          next();
      });
    })
  }
}

function searchPatients(req, res, next) {
  const name = req.query.name;
  const practitioner = req.session.user.name;
  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('patients')
    .find({name:{ $regex: name, $options: 'i'}, practitioner: practitioner})
    .toArray(function(err,data){
      if (err) throw err
      console.log(data)
      res.foundPatients = data
      next();
    })
  })
}

function addAppointment(req, res, next) {
  const practitioner = req.session.user.name;
  const patientID = req.params.id
  const newAppt = req.body.date
  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('patients')
      .update({_id : ObjectId(patientID), practitioner: practitioner},
      { $addToSet:
        {appointments: newAppt}
      }
    )
  })
  next();
}

module.exports = { createPatient, sortPatients, findPatient, searchPatients, addAppointment }
