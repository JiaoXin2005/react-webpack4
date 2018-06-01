import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import List from './List'
import logo from './logo.svg'
import './style.scss'
import User from './component/User'
import Home from './component/Home'


class App extends Component {
  render () {
    return (
      <div>
        <h3 >Demo Test</h3>
        <img src={logo} alt="" width='200' height='200'/>
        <List/>
        <Router>
          <div>
            <ul>
              <li><Link to='/home'>home</Link></li>
              <li><Link to='/user'>user</Link></li>
            </ul>
            <Route path="/user" component={User} />
            <Route path="/home" component={Home} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App