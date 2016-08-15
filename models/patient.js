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
    db.collection('patients').insertOne(patientInfo,
      function(err,result) {
      if (err) throw err;
      console.log(result)
      next()
    })
  })
}

function getAppointments(req, res, next) {
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

function checkPatientIn(req, res, next) {
  console.log('got here')
  const practitioner = req.session.user.name;
  const patientID = req.body.patientID
  const appt = req.body.date
  MongoClient.connect(dbConnection, function(err, db){
    db.collection('patients')
    .update({_id : ObjectId(patientID), practitioner: practitioner},
    {
      $pull: {appointments: appt},
      $set: {needsNotes : true}
    })
  })
  next();
}

function getAllNeedNotes(req, res, next) {
  if (!req.session.user) {
    console.log('yo, gotta log in!')
    next();
  } else {
    console.log('getting this far')
    const practitioner = req.session.user.name;
    MongoClient.connect(dbConnection, function(err, db) {
      db.collection('patients')
        .find({ needsNotes : true , practitioner: practitioner})
        .toArray(function(err,data){
        if (err) throw err
        res.allNeedNotes = data
        console.log(res.allNeedNotes)
        next();
      })
    })
    console.log('now I got this far')
  }
}

function addNote(req, res, next) {
  if (!req.session.user) {
    console.log('yo, gotta log in!')
    next();
  } else {
    const practitioner = req.session.user.name;
    const patientID = req.body.patientID;
    const note = req.body.note;
    MongoClient.connect(dbConnection, function(err, db) {
      db.collection('patients')
        .update({_id : ObjectId(patientID), practitioner: practitioner}, {
             $push: { notes: note },
             $set: {needsNotes : false}
        })
    })
    console.log('just above next')
    next();
  }
}

function searchAppointments(req,res,next) {
  if (!req.session.user) {
    console.log('yo, gotta log in!')
    next();
  } else {
    const practitioner = req.session.user.name;
    const date = req.body.date;
    console.log('date input', req.body.date)
    MongoClient.connect(dbConnection, function(err,db) {
      db.collection('patients')
      .find({practitioner: practitioner, appointments: date})
      .toArray(function(err,data){
        if (err) throw err
        res.searchedAppts = data
        console.log(res.searchedAppts)
        next();
      })
    })
  }
}

module.exports = { createPatient, getAppointments, findPatient, searchPatients, addAppointment, checkPatientIn, getAllNeedNotes, addNote, searchAppointments}
