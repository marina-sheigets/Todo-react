import React, { Component } from "react";
import Loader from "./Loader/Loader.js";
import TodoItem from "./TodoItem.js";

const URL = "http://localhost:3030/todos";

const OPTIONS={
  all:"All",
  active:"Active",
  completed: "Completed",
}

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos:  window.localStorage.getItem("todos")
        ? JSON.parse(window.localStorage.getItem("todos"))
        :  [],
      newTodoText: "",
      selectedOption: OPTIONS.all,
      isLoading:true
    };

  }

  componentDidMount() {
    fetch(URL)
    .then(res => res.json())
    .then((res)=>{
      this.setState({ selectedOption: OPTIONS.all, todos:res/* , isLoading:false */});
    })
    .catch(() => this.setState({ todos:[], selectedOption: OPTIONS.all/* , isLoading:false */}))
   
    setTimeout(()=>{
      this.setState({isLoading:false})
    },500) 
  }

  handleInputChange = (e) => {
    this.setState({ newTodoText: e.target.value });
  }

  addTodo = (e) => {
    e.preventDefault();

    if (this.state.newTodoText.trim().length !== 0) {

      fetch(URL,{
        method:"POST",
        body:JSON.stringify({title:this.state.newTodoText})
      })
      .then(res => res.json())
      .then((res)=>{
        this.setState({ todos:res, newTodoText: "" });
      })
    }
  }

  deleteTodo = (id) => {
    fetch(URL + "/" + id,{
      method:"DELETE",
    })
    .then(res => res.json())
    .then((res)=>{
      this.setState({ todos:res});
    })  
  }

  changeStatus = (id) => {
    fetch(URL + "/" + id,{
      method:"PATCH",
      body:JSON.stringify({changeStatus:"true"})
    })
    .then(res => res.json())
    .then((res)=>{
      this.setState({ todos:res});
    })  
  }
  

  isAllCompleted = () =>{
    return this.state.todos.every(elem => elem.checked);
  }

  editTodo = (e, id, newValue) => {
    e.preventDefault();
   
    fetch(URL + "/" + id,{
      method:"PATCH",
      body:JSON.stringify({title:newValue})
    })
    .then(res => res.json())
    .then((res)=>{
      this.setState({ todos:res});
    })  
  }

  changeAllCompleted = () => {
    let active = this.isAllCompleted();
    console.log(active)

    fetch(URL,{
      method:"PATCH",
      body:JSON.stringify({changeStatusAll:"true",active})
    })
    .then(res => res.json())
    .then((res)=>{
      console.log(res)
      this.setState({ todos:res});
    })  
    .catch(err=>console.log(err))
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
    const state = {...this.state};
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
            value={state.newTodoText}
            onChange={this.handleInputChange}
            className="todo-input"
            placeholder="Enter todo task"
          />
          <input type="submit" className="submit" value="Add"></input>
        </form>
        <ul className="todo-list">
         {
          state.isLoading ?
            <Loader/>
            :
           filtered.length === 0 ? (
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
