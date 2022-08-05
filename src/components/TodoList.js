import React, { Component } from "react";
import TodoItem from "./TodoItem.js";

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: window.localStorage.getItem("todos")
        ? JSON.parse(window.localStorage.getItem("todos"))
        : [],
      todo: "",
      filtered: window.localStorage.getItem("todos")
        ? JSON.parse(window.localStorage.getItem("todos"))
        : [],
      variant: "All",
      active: window.localStorage.getItem("active"),
    };

    this.saveTodos = this.saveTodos.bind(this);
  }

  componentDidMount() {
    this.setState({ variant: "All" });
    this.changeStatus();
    this.filter();
  }

  handleInputChange(e) {
    this.setState({ todo: e.target.value });
  }

  addTodo(e) {
    e.preventDefault();

    if (this.state.todo.trim().length !== 0) {
      let changedTodos = [
        { id: Date.now(), text: this.state.todo, checked: false },
        ...this.state.todos,
      ];
      this.saveTodos(changedTodos);
      this.setState({ todo: "" }, () => {
        this.changeStatus();
        this.filter();
      });
    }
  }

  deleteTodo(id) {
    let changedTodos = [...this.state.todos];
    changedTodos = changedTodos.filter((elem) => elem.id !== id);
    this.saveTodos(changedTodos);
    this.setState({ todo: "" }, () => {
      this.changeStatus();
      this.filter();
    });
  }

  changeStatus(id = undefined) {
    let changedTodos = [...this.state.todos];
    let totalLength = this.state.todos.length;
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
    }
    this.saveTodos(changedTodos, () => {
      let amountOfCompleted = totalLength;
      //console.log(this.state.todos,totalLength);

      for (let i = 0; i < totalLength; i += 1) {
        if (!changedTodos[i].checked) {
          amountOfCompleted -= 1;
        }
      }

      if (amountOfCompleted === totalLength) {
        this.setState({ active: "active" });
        window.localStorage.setItem("active", "active");
      } else {
        this.setState({ active: "" });
        window.localStorage.setItem("active", "");
      }
    });
  }

  editTodo(e, id, newValue) {
    e.preventDefault();

  /*   let changedTodos = this.state.filtered.map((elem) => {
      if (elem.id === id) {
        return {
          ...elem,
          text: newValue,
        };
      }
      return elem;
    });

    this.setState({ filtered: changedTodos });
 */
    this.setState(
      (state) => ({
        filtered: state.filtered.map((elem) => {
          if (elem.id === id) {
            console.log("work")
            return {
              ...elem,
              text: newValue,
            };
          }
          return elem;
        }),
      }),
      () => {
        this.saveTodos(this.state.filtered)
      }
    );

    //this.saveTodos(changedTodos);
  }

  changeAllHandler() {
    let currentClass = this.state.active === "active" ? "" : "active";
    this.setState({ active: currentClass }, () => {
      this.changeAllCompleted();
    });
  }

  changeAllCompleted() {
    let changedTodos = this.state.todos;

    changedTodos.forEach((elem) => {
      if (this.state.active === "active") {
        elem.checked = true;
      } else {
        elem.checked = false;
      }
    });
    this.saveTodos(changedTodos);
  }

  saveTodos(newTodos, callback = undefined) {
    this.setState(
      {
        filtered: newTodos,
        todos: newTodos,
      },
      () => {
        if (callback) callback();
        window.localStorage.setItem("todos", JSON.stringify(newTodos));
        this.filter();
      }
    );
  }

  filter(e) {
    let variant;
    e ? (variant = e.target.value) : (variant = this.state.variant);

    let arr = [];
    switch (variant) {
      case "Active":
        this.setState({ variant: "Active" });
        arr = this.state.todos.filter((elem) => elem.checked != true);
        break;
      case "Completed":
        this.setState({ variant: "Completed" });
        arr = this.state.todos.filter((elem) => elem.checked != false);
        break;
      case "All":
        this.setState({ variant: "All" });
        arr = this.state.todos;
        break;
    }
    this.setState({ filtered: arr });
  }

  render() {
    return (
      <>
        <h1 className="main-h1">ToDo List</h1>
        <form className="todo-form" onSubmit={(e) => this.addTodo(e)}>
          <button
            className={"activate " + this.state.active}
            onClick={() => this.changeAllHandler()}
          >
            ☑
          </button>
          <input
            type="text"
            value={this.state.todo}
            onChange={(e) => this.handleInputChange(e)}
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
                deleteTodo={(id) => this.deleteTodo(id)}
                changeStatus={(id) => this.changeStatus(id)}
                editTodo={(e, id, newValue) => this.editTodo(e, id, newValue)}
              />
            ))
          )}
        </ul>

        <div className="filter-area">
          <select onChange={(e) => this.filter(e)}>
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>
      </>
    );
  }
}
