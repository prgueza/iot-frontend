//Entry file for webpack

// bootstrap js
require('jquery/dist/jquery');
require('popper.js/dist/umd/popper');
require('bootstrap/dist/js/bootstrap');
import "bootstrap";


// styles
require('./stylesheets/style.scss');

// react components
import App from './javascripts/app.jsx';
import './javascripts/tooltipsEn.jsx';
