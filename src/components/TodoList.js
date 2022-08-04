import React, { Component } from "react";
import TodoItem from "./TodoItem.js";

export default class TodoList extends Component {
  constructor() {

    super();
    this.state = {
      edit: "",
      editText:"",
      todos: JSON.parse(localStorage.getItem("todos")),
      todo: "",
      filtered:JSON.parse(localStorage.getItem("todos")),
      variant:"All",
      active:localStorage.getItem("active")
    };

    this.filter = this.filter.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.saveTodos = this.saveTodos.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeAllHandler = this.changeAllHandler.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeAllCompleted = this.changeAllCompleted.bind(this);

  }

  componentDidMount(){
    this.setState(() => ({variant:"All"}))
    this.changeStatus();
    this.filter();
  }

  handleInputChange(e) {
    this.setState(() => ({ todo: e.target.value }));
  }

  addTodo(e) {
    e.preventDefault();

    if (this.state.todo.trim().length !== 0) {

      let changedTodos=[{id: Date.now(), text: this.state.todo, checked: false},...this.state.todos];
      this.saveTodos(changedTodos);
      this.setState(() => ({todo:''}),() => {
        this.changeStatus();
        this.filter();
      });
    }
  }

  deleteTodo(id) {
    let changedTodos = this.state.todos;
    changedTodos = changedTodos.filter((elem) => elem.id != id);
    this.saveTodos(changedTodos);
    this.setState(() => ({todo:''}),() => {
      this.changeStatus();
      this.filter();
    });
  }

  changeStatus(id=undefined) {
    let changedTodos = this.state.todos;
    let totalLength=this.state.todos.length;
    if(id){
      changedTodos.forEach((elem) => {
        if (elem.id === id) {
          elem.checked = !elem.checked;
        }
      });
  
      this.saveTodos(changedTodos);
    }

    let amountOfCompleted=totalLength; 

    for(let i = 0;i < totalLength;i ++){
      if(!this.state.todos[i].checked){
        amountOfCompleted--;
      }
    }
   
    if(amountOfCompleted === totalLength){
      this.setState(() => ({active:"active"}))
      localStorage.setItem("active","active")
    }else{
      this.setState(() => ({active:""}))
      localStorage.setItem("active","")
    }
  }

  setEdit(id,text){ 
    this.setState(() => ({ 
      edit:id, 
      editText:text 
  })) 
  } 

  editTodo(e,id,newValue){ 
    e.preventDefault(); 
    let changedTodos = this.state.todos; 
    changedTodos.forEach(elem => { 
      if(elem.id === id){ 
        elem.text = newValue 
      } 
    }); 

    this.saveTodos(changedTodos);
    this.setState(() => ({edit:""}))
  } 

  changeAllHandler(){
    let currentClass=this.state.active === "active" ? "":"active";
    this.setState(() => ({active:currentClass}),()=>{
      this.changeAllCompleted();
    })      
  }

  changeAllCompleted(){
    let changedTodos=this.state.todos;

     changedTodos.forEach(elem => { 
        if(this.state.active === "active"){ 
            elem.checked = true; 
        }else{ 
            elem.checked = false 
      }}) 
      console.log(changedTodos)
      this.saveTodos(changedTodos); 
      console.log(this.state.todos)

  }

  saveTodos(newTodos) {
    this.setState(
      () => ({
        todos: newTodos,
      }),
      () => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.filter();
      }
    );
  }

  filter(e){
    let variant;
    e? variant = e.target.value : variant = this.state.variant;

    let arr=[];
    switch(variant){
      case "Active": 
          this.setState(() => ({variant:"Active"}))
          arr = this.state.todos.filter(elem=>elem.checked != true); 
          break; 
      case "Completed": 
          this.setState(() => ({variant:"Completed"}))
          arr = this.state.todos.filter(elem => elem.checked != false); 
          break; 
      case "All": 
      this.setState(() => ({variant:"All"}))

          arr = this.state.todos; 
          break; 
      
    } 
      this.setState(() => ({filtered:arr})) 
    }


  render() {
    return (
      <>
        <h1 className="main-h1">ToDo List</h1>
        <form className="todo-form" onSubmit={this.addTodo}>
          <button
            className={
              "activate " + this.state.active
            } 
            onClick={this.changeAllHandler} 
          >
            ☑
          </button>
          <input
            type="text"
            value={this.state.todo}
            onChange={this.handleInputChange}
            className="todo-input"
            placeholder="Enter todo task"
          />
          <input type="submit" className="submit" value="Add"></input>
        </form>
        <ul className="todo-list">
          {this.state.filtered.length === 0 ? (
            <li>No any todos...</li>
          ) : (
            this.state.filtered.map((elem) => (
              <TodoItem
                key={elem.id}
                todo={elem}
                deleteTodo={this.deleteTodo}
                changeStatus={this.changeStatus}
                editTodo={this.editTodo}
                edit={this.state.edit}
                editText={this.state.editText}
                setEdit={this.setEdit}
              />
            ))
          )}
        </ul>
        <div className="filter-area">
          <select onChange={this.filter}>
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>
      </>
    );
  }
}