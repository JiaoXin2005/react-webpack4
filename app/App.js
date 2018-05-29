import React, { Component } from 'react'
import List from './List'
import logo from './logo.svg'
import './style.scss'

class App extends Component {
  render () {
    console.log('13121312321')
    return (
      <div>
        <h3 className='color'>Demo Test</h3>
        <img src={logo} alt="" width='200' height='200'/>
        <List/>
      </div>
    )
  }
}

export default App