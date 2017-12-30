// Importacion de librerias
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Importacion de componentes
import { Main } from './components/main.jsx';

// Declaracion de componentes
class App extends Component {
  render(){
    return(
      <Router basename="/">
        <Main/>
      </Router>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
