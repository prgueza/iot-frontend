// Importacion de librerias
import React from 'react';
import ReactDOM from 'react-dom';

// Importacion de componentes
 import { Login } from './components/login/login.jsx';

// Declaracion de componentes
const App = () => {
  return(
    <Login/>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
