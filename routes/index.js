const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

 /* GET img resources */
 router.get('/img/:image', function(req, res, next) {
   var imgPath = '../public/img/' + req.params.image;
   res.sendFile(imgPath);
 });

 /* GET disconect */
 router.get('/disconect', function(req, res, next) {
   req.session.destroy();
   res.redirect('/');
 });

/* GET home page. */
router.get('/*'  , function(req, res, next) {
  if(req.session.logedin){
    res.render('index');
  } else {
    res.render('login');
  }
});

router.post('/', function(req, res, next){
  console.log(req.body);
  fetch(
    'http://localhost:4000/users/login',
    {
    method: 'post', // post method
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      login: req.body.login,
      password: req.body.password
    })
    }
  )
  .then(res => res.json())
  .then(auth => {
    if (auth.userID) {
      // Save session parameters
      req.session.logedin = true;
      res.cookie('userID', auth.userID, { httpOnly:false });
      res.redirect('/');
    } else {
      res.render('login');
    }
  })
  .catch(err => console.log(err));
});


module.exports = router;
