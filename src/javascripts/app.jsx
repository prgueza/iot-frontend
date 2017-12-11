// Importacion de librerias
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Importacion de componentes
// import { Login } from './components/login.jsx';
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
