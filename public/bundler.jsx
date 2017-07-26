import React from 'react';
import ReactDOM from 'react-dom';

/* import stylesheets and scripts */
require('bootstrap/dist/css/bootstrap.css');
require('./stylesheets/style.sass');

/* import components */
import App from './javascripts/components.jsx';

ReactDOM.render(<App />, document.getElementById('react-dom'));
