const express = require('express');
const router = express.Router();

/* import API routes */
const displaysRoutes = require('../api/routes/displays');
const imagesRoutes = require('../api/routes/images');
const groupsRoutes = require('../api/routes/groups');
const settingsRoutes = require('../api/routes/settings');
const usersRoutes = require('../api/routes/users');

/* declare middlewares for API routes */
router.use('/api/displays', displaysRoutes);
router.use('/api/images', imagesRoutes);
router.use('/api/groups', groupsRoutes);
router.use('/api/settings', settingsRoutes);
router.use('/api/users', usersRoutes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next){
  if(req.body.user == 'admin' && req.body.password == '1234'){
    res.redirect('/');
  } else {
    res.render('login');
  }
});

/* GET img resources */
router.get('/img/:image', function(req, res, next) {
  var imgPath = '../public/img/' + req.params.image;
  res.sendFile(imgPath);
});


module.exports = router;
