import React, { Component } from 'react'
import Item from './Item'

const data = [{name: 'a'}, {name: 'b'}, {name: 'c'}]

class User extends Component {
  render () {
    return (
      <div className='list'>
        {data.map(item => <Item name={item.name} key={item.name}/>)}
      </div>
    )
  }
}

export default User