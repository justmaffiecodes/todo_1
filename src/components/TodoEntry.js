import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import {DeleteButton, FinishButton} from './Buttons';
// import FinishButton from './FinishButton'
  
class TodoEntry extends Component{
  constructor(props){
    super(props)
    this.state = {
      deleted: false
    } 
    this.onClick = this.onClick.bind(this)
  }

  onClick(event, data){
    this.setState({deleted:true})
    this.props.removeEntry(this.props.actualKey)
  }
  
  render(){
    if(!this.state.deleted){
      var onClick = function(event,data){this.props.modifyEntry(this.props.actualKey, true)}.bind(this)
    return (
      <Table.Row>
        <Table.Cell>
          {this.props.entry.name}
        </Table.Cell>
        <Table.Cell>
          {this.props.entry.finished ? "Yes" : "No"}
        </Table.Cell>
        <Table.Cell>
          {this.props.entry.description}
        </Table.Cell>
        <Table.Cell>
          <DeleteButton onClick={this.onClick} />
          {this.props.entry.finished?"":<FinishButton onClick={onClick} />}
        </Table.Cell>
      </Table.Row>
    )}else{return null}
  }
}

export default TodoEntry;