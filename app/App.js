import React, { Component } from 'react'
import List from './List'
import logo from './logo.svg'

class App extends Component {
  render () {
    return (
      <div>
        <img src={logo} alt="" width='200' height='200'/>
        <List/>
      </div>
    )
  }
}

export default App