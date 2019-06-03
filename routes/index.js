const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');

/* GET img resources */
router.get('/img/:image', (req, res) => {
  const imgPath = `../public/img/${req.params.image}`;
  res.sendFile(imgPath);
});

/* GET disconect */
router.get('/disconect', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

/* GET home page. */
router.get('/*', (req, res) => {
  if (req.session.logedin) {
    res.render('index');
  } else {
    // res.render('login');
    res.render('index');
  }
});

module.exports = router;
