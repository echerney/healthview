const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/healthview';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

function loginUser(req,res,next) {
  let email = req.body.email;
  let password = req.body.password;

  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('users').findOne({"email": email}, function(err, user) {
      if(err) throw err;
      if(user === null) {
        console.log('No account found at ', email);
      } else  if(bcrypt.compareSync(password, user.passwordDigest)){
        res.user = user;
      }
      next();
    })
  })
}

function createSecure(email, password, callback) {
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(email,hash);
    })
  })
}

function createUser(req, res, next) {
  console.log('got here')
  console.log(req.body)
  createSecure( req.body.email, req.body.password, saveUser)
  function saveUser(email, hash) {
    MongoClient.connect(dbConnection, function(err, db) {
      let userInfo = {
        name: req.body.name,
        email: email,
        passwordDigest: hash
      }
      db.collection('users').insertOne(userInfo, function(err, result) {
        if(err) throw err;
        next();
      });
    });
  }
}


module.exports = { createUser, loginUser }
