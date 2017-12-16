const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET user info */
router.get('/user', function(req, res, next) {
  // Send session user parameters
  fetch(req.session.user_url)
    .then((res) => res.json())
    .then((user_data) => res.json(user_data))
    .catch((err) => console.log(err));
});

 /* GET img resources */
 router.get('/img/:image', function(req, res, next) {
   var imgPath = '../public/img/' + req.params.image;
   res.sendFile(imgPath);
 });

 /* GET disconect*/
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
  fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(usr => {
      const user = usr.find((u) => u.login == req.body.user);
      if (user && user.password == req.body.password){
        // Save session parameters
        req.session.logedin = true;
        req.session.user_url = user.url;
        res.render('index');
      } else {
        res.render('login');
      }
    })
    .catch(err => console.log(err));

});


module.exports = router;
