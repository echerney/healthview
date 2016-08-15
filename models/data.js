const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/healthview';
const { ObjectId } = require('mongodb')

function getData(req, res, next) {
    if (!req.session.user) {
    console.log('yo, gotta log in!')
    next();
  } else {
    const practitioner = req.session.user.name;
    const diagnosis = req.body
    console.log('practitioner', practitioner)
    console.log('body',diagnosis)
    MongoClient.connect(dbConnection, function(err,db) {
      db.collection('patients')
      .find({practioner: practitioner, diagnosis: diagnosis})
      .toArray(function(err, data){
        if (err) throw err
        res.chartData = data
        console.log(res.chartData)
        next();
      });
    })
  }
};

function popDropdown(req,res,next) {
  if (!req.session.user) {
    console.log('yo, gotta log in!')
    next();
  } else {
    const practitioner = req.session.user.name;
    console.log('practitioner', practitioner)
    MongoClient.connect(dbConnection, function(err,db) {
      db.collection('patients')
      .distinct("diagnosis", {practitioner: practitioner},
        function(err,data){
          if (err) throw err;
          res.diagnoses = data;
          console.log(res.diagnoses)
          next();
        })
    })
  }
}


module.exports = { getData, popDropdown }
