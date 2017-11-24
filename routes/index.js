var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var datos = require('../public/api/datos.js');
var displays = datos.displays;
var imagenes = datos.imagenes;
var grupos = datos.grupos;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Api get all
router.get('/api/displays', function(req, res, next) {
  setTimeout(function(){
    res.json(displays);
  }, 3000)
});

router.get('/api/imagenes', function(req, res, next) {
  res.json(imagenes);
});

router.get('/api/grupos', function(req, res, next) {
  res.json(grupos);
});



module.exports = router;
