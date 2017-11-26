// Importacion de librerias
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
const cx = require('classnames');

// Importacion de componentes
import { Login } from './components/login.jsx';
import { Main } from './components/main.jsx';


// Declaracion de componentes
const App = () => {
  return(
    <Router>
      <Main/>
    </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
