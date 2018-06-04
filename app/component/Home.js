import React, { Component } from 'react'
import { observable, action, toJS} from 'mobx'
import { observer } from 'mobx-react'

var appState = observable({
  timer: 0
})

appState.resetTimer = action(function reset(params) {
  appState.timer = 0
})


var user = observable({
  name: 'jiaoxin',
  age: 21
})

@observer
class Demo extends Component {

  onReset = () => {
    this.props.appState.resetTimer()
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  componentDidMount() {
    this.timer = setInterval(action(function tick(params) {
      appState.timer++
    }), 1000)
  }

  render() {
    return (
      <div>
        {this.props.appState.timer}
        <button onClick={this.onReset}>加</button>
      </div>
    )
  }
}

// @observer
class Home extends Component {
  render() {
    console.log(this)
    return (
      <div>
        <Demo appState={appState}/>
      </div>
    )
  }
}



setTimeout(() => {
  user.name = 'adasad'
}, 500);

export default Home