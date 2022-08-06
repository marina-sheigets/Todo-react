import React, { Component } from "react";
import TodoItem from "./TodoItem.js";


const OPTIONS={
  all:"All",
  active:"Active",
  completed: "Completed"
}

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: window.localStorage.getItem("todos")
        ? JSON.parse(window.localStorage.getItem("todos"))
        : [],
      newTodoText: "",
      selectedOption: OPTIONS.all,
    };

  }

  componentDidMount() {
    this.setState({ selectedOption: OPTIONS.all });
  }

  handleInputChange = (e) => {
    this.setState({ newTodoText: e.target.value });
  }

  addTodo = (e) => {
    e.preventDefault();

    if (this.state.newTodoText.trim().length !== 0) {
      let changedTodos = [
        { id: Date.now(), text: this.state.newTodoText, checked: false },
        ...this.state.todos,
      ];
      this.setState({ newTodoText: "" });
      this.saveTodos(changedTodos);
    }
  }

  deleteTodo = (id) => {
    let changedTodos = [...this.state.todos];
    changedTodos = changedTodos.filter((elem) => elem.id !== id);
    this.saveTodos(changedTodos);
    this.setState({ todo: "" });
  }

  changeStatus = (id) => {
    let changedTodos = [...this.state.todos];
    if (id) {
      changedTodos = changedTodos.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            checked: !elem.checked,
          };
        }
        return elem;
      });
      this.saveTodos(changedTodos)
    }
  }

  isAllCompleted = () =>{
    return this.state.todos.every(elem => elem.checked);
  }

  editTodo = (e, id, newValue) => {
    e.preventDefault();
   
    let changedTodos = this.state.todos.map((elem) => {
      if (elem.id === id) {
        return {
          ...elem,
          text: newValue,
        };
      }
      return elem;
    });

    this.saveTodos(changedTodos);
  }

  changeAllCompleted = () => {
    let changedTodos =[...this.state.todos];

    if (this.isAllCompleted()) {
      changedTodos = changedTodos.map(elem => {
        return{
          ...elem,
          checked:false
        }
      })
    }else{
      changedTodos = changedTodos.map(elem => {
        return{
          ...elem,
          checked:true
        }
      })
    }    
    this.saveTodos(changedTodos); 
  }

  saveTodos=(newTodos, callback)=> {
    this.setState(
      {
        todos: newTodos,
      },
      () => {
        if (callback) callback();
        window.localStorage.setItem("todos", JSON.stringify(newTodos));
      }
    );
  }

  setFilter(selectedOption) {
   this.setState({ selectedOption }); 
  }

  getFilteredTodos = () =>{
    const selectedOption = this.state.selectedOption;

    let arr = [];
    switch (selectedOption) {
      case "Active":
        arr = this.state.todos.filter((elem) => !elem.checked );
        break;
      case "Completed":
        arr = this.state.todos.filter((elem) => elem.checked );
        break;
      case "All":
        arr = this.state.todos;
        break;
    }

    return arr;
  }

  render() {
    const filtered = this.getFilteredTodos();
    return (
      <>
        <h1 className="main-h1">ToDo List</h1>
        <form className="todo-form" onSubmit={this.addTodo}>
          <button
            className={"activate " + this.isAllCompleted()}
            onClick={this.changeAllCompleted}
          >
            ☑
          </button>
          <input
            type="text"
            value={this.state.newTodoText}
            onChange={this.handleInputChange}
            className="todo-input"
            placeholder="Enter todo task"
          />
          <input type="submit" className="submit" value="Add"></input>
        </form>
        <ul className="todo-list">
          { filtered.length === 0 ? (
            <li>No any todos...</li>
          ) : (
           filtered.map((elem) => (
              <TodoItem
                key={elem.id}
                todo={elem}
                deleteTodo={this.deleteTodo}
                changeStatus={this.changeStatus}
                editTodo={this.editTodo}
              />
            ))
          )}
        </ul>

        <div className="filter-area">
          <select onChange={(e) => this.setFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>
      </>
    );
  }
}
