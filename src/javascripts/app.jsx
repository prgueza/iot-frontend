// Importacion de librerias
import React from 'react';
import ReactDOM from 'react-dom';
const cx = require('classnames');

// Importacion de componentes
const LoginComponente = require('./components/login.jsx');
const MainComponente = require('./components/main.jsx');
const Login = LoginComponente.comp;
const Main = MainComponente.comp;

// Declaracion de componentes
class App extends React.Component{
  render(){
    return(
      <Main/>
    );
  }
}

ReactDOM.render(
  <App/>, document.getElementById('root')
);
