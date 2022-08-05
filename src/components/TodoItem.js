import React, { Component } from "react";

export default class TodoItem extends Component {
  constructor(props) {
    super();

    this.state = {
      todo: props.todo,
    };
  }


  render() {
    return (
        <>
        {
            this.props.edit === this.state.todo.id ?
            <span className="edit">
                   <input value={this.props.editText}  onChange={(e)=>this.props.setEdit(this.state.todo.id,e.target.value)} /> 
                   <button className='save' type="submit"  onClick={(e) => this.props.editTodo(e,this.props.edit/*,this.props.editText*/)}>☑</button> 
            </span>
                :
            <li>
                <input
                type="checkbox"
                defaultChecked={this.state.todo.checked}
                onChange={() => this.props.changeStatus(this.state.todo.id)}
                />
                <label
                className={this.state.todo.checked.toString()}
                onDoubleClick={() => this.props.setEdit(this.state.todo.id,this.props.todo.text)}
                >
                {this.state.todo.text}
                </label>
                <button onClick={() => this.props.deleteTodo(this.state.todo.id)}>
                ×
                </button>
            </li>
        }
        </>
      
    );
  }
}
