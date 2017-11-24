// Importacion de librerias
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
const cx = require('classnames');

// Importacion de componentes
import { Login } from './components/login.jsx';
import { Main } from './components/main.jsx';


// Declaracion de componentes
class App extends React.Component{
  render(){
    return(
      <Router>
        <Main/>
      </Router>
    );
  }
}

ReactDOM.render(
  <App/>, document.getElementById('root')
);
