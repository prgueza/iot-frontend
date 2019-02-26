// Entry file for webpack
import ReactDOM from 'react-dom';
import React from 'react';

// bootstrap js
import 'bootstrap';

// react components
import App from './javascripts/app';

require('jquery/dist/jquery');
require('bootstrap/dist/js/bootstrap');

ReactDOM.render(<App />, document.getElementById('root'));

// styles
require('./stylesheets/style.scss');
