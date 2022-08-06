import React, { Component } from "react";

export default class TodoItem extends Component {
  constructor() {
    super();

    this.state = {
      editingMode:false,
      editID:"",
      editText:/* props.todo.text */"",
    }
  }

  handleDeleteTodo(){
    this.props.deleteTodo(this.props.todo.id)
  }

  handleChangeStatus(){
    this.props.changeStatus(this.props.todo.id);
  }

  handleSetEdit(){
    this.setState({editingMode:true,editID:this.props.todo.id,editText:this.props.todo.text})
  }

  handleEditTodo(e){
    this.props.editTodo(e,this.state.editID,this.state.editText);
    this.setState({editingMode:false})
  }

  handleCancelTodo(e){
    this.props.editTodo(e,this.state.editID,this.props.todo.text);
    this.setState({editingMode:false,editingText:this.props.todo.text})
  }
  
  render() {
    return (
        <>
        {
            this.state.editingMode ?
            <span className="edit">
                  <button className='save' type="submit"  onClick={(e) => this.handleEditTodo(e)}>☑</button> 
                   <input value={this.state.editText}  onChange={(e)=>this.setState({editText:e.target.value})} /> 
                   <button className='cancel' type="submit"  onClick={(e) => this.handleCancelTodo(e)}>Cancel</button> 
            </span>
                :
            <li>
                <input
                type="checkbox"
                defaultChecked={this.props.todo.checked }
                onChange={() => this.handleChangeStatus()}
                />
                <label
                className={this.props.todo.checked.toString()}
                onDoubleClick={() => this.handleSetEdit()}
                >
                {this.props.todo.text}
                </label>
                <button onClick={() => this.handleDeleteTodo()}>
                ×
                </button>
            </li>
        }
        </>
      
    );
  }
}
