import React, { Component } from 'react'
import { observable, computed, action, configure, runInAction, autorun} from 'mobx'
import { observer } from 'mobx-react'


class TodoState {
  @observable todos = []

  @computed get completedTodoCount () {
    return this.todos.filter(todo => todo.completed === true).length
  }

  @action
  addTodo(task) {
    this.todos.push({task, completed: true})
  }

  @action
  toggleCompleted(index) {
    this.todos[index].completed = !this.todos[index].completed
  }

}


@observer
class TodoList extends Component {

  onAddTodos = () => {
    setTimeout(() => {
      this.props.todoState.todos.push({ task: '生化危机', completed: false })
    }, 500);
  }

  render() {
    let {todoState} = this.props
    return (
      <div>
        <button onClick={this.onAddTodos}>add</button>
        {todoState.todos.map((item, index) => <Todo todo={item} key={index} index={index} todoState={todoState}/>)}
        Propgress: { todoState.completedTodoCount }
        
      </div>
    )
  }
}

@observer
class Todo extends Component {

  onRename = () => {
    const todo = this.props.todo
    todo.task = prompt('输入任务名', todo.task) || ""
  }

  onToggleCompleted = (index) => {
    const { todo, todoState} = this.props
    runInAction(() => {
      todo.completed = !todo.completed
    })
    // todo.completed = !todo.completed
    // todoState.toggleCompleted(index)
  }

  render() {
    let {todo, index } = this.props
    return (
      <li onDoubleClick={this.onRename}>
        <input type="checkbox" checked={todo.completed} onChange={this.onToggleCompleted.bind(this, index)} />
        {todo.task}
      </li>
    )
  }
}

configure({ enforceActions: true})
const todoState = new TodoState()
todoState.addTodo('塞尔达传说 荒野之息')
todoState.addTodo('怪物猎人 世界')



export default () => <TodoList todoState={todoState}/>