import React, { Component } from "react";

export default class TodoItem extends Component {
  constructor(props) {
    super();

    this.state = {
      edit:"",
      editText:"",
      todo: props.todo,
    };
  }

  
  setEdit(text){ 
    this.setState(() => ({ 
      edit:this.state.todo.id, 
      editText:text || this.state.todo.text  
  })) 
  } 

  handleDeleteTodo(){
    this.props.deleteTodo(this.state.todo.id)
  }

  handleChangeStatus(){
    this.props.changeStatus(this.state.todo.id);
  }

  handleSetEdit(){
    this.setEdit(this.state.todo.text)
  }

  handleEditTodo(e){
    this.props.editTodo(e,this.state.edit,this.state.editText);
    this.setState({edit:""})
  }


  render() {
    return (
        <>
        {
            this.state.edit === this.state.todo.id ?
            <span className="edit">
                   <input value={this.state.editText}  onChange={(e)=>this.setEdit(e.target.value)} /> 
                   <button className='save' type="submit"  onClick={(e) => this.handleEditTodo(e)}>☑</button> 
            </span>
                :
            <li>
                <input
                type="checkbox"
                defaultChecked={this.state.todo.checked}
                onChange={() => this.handleChangeStatus()}
                />
                <label
                className={this.state.todo.checked.toString()}
                onDoubleClick={() => this.handleSetEdit()}
                >
                {this.state.todo.text}
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
