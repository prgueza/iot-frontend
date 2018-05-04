/* IMPORT MODULES */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

/* IMPORT COMPONENTS */
import { Main } from './components/main.jsx'
import { Login } from './components/login/login.jsx'

/* COMPONENTS */
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      // user data
      user: null,
      token: null,
      data: null,
      // login flag
      isLoggedIn: false,
      // eror handling
      error: null
    }
  }

  login = (user, token, data) => {
    this.setState({ isLoggedIn: true, user, token, data })
  }

  logout = () => {
    this.setState({ isLoggedIn: false, user: null, token: null, data: null })
  }

  render(){
    // get state
    const { isLoggedIn, error } = this.state
    // return for rendering
    if (error) {
      // TODO: error handling
      return null;
    } else if (!isLoggedIn) {
      return ( <Login login={this.login}/> )
    } else {
      return (
        <Router basename="/">
          <Main logout={this.logout} {...this.state}/>
        </Router>
      )
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
