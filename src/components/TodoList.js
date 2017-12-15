import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { NewEntryInput } from './Inputs';
import TodoEntry from './TodoEntry';
import {FormattedMessage} from 'react-intl';
  
class TodoList extends Component {
    constructor(props) {
      super(props)
      var todo_entries = new Map()
      this.state={todo_entries:todo_entries}
      this.removeEntry = this.removeEntry.bind(this)
      this.addEntry = this.addEntry.bind(this)
      this.render = this.render.bind(this)
      this.modifyEntry = this.modifyEntry.bind(this)
    }
  
    addEntry(entry){
      var key = entry.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').toLowerCase()
      if(entry.finished === null){
        entry.finished = false;
      }
      var entries = new Map();
      entries.set(key, entry)
      this.setState({todo_entries:entries})
    }
  
    modifyEntry(key, finished){
      var entry = this.state.todo_entries.get(key);
      entry.finished = finished;
      var entries = this.state.todo_entries;
      entries.set(key,entry)
      this.setState({todo_entries:entries})
    }
  
    removeEntry(key){
      var entries = this.state.todo_entries
      if(!entries.has(key)){
        return
      }
      entries.delete(key)
      this.setState({todo_entries:entries})
    }
  
    render () {
      var removeEntry = this.removeEntry
      var modifyEntry = this.modifyEntry
      var entries = Array.from(this.state.todo_entries.entries())
      return (
        <div className="todoList">
          <Table color="red">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell><FormattedMessage id="TodoList.Name" defaultMessage="Name" /></Table.HeaderCell>
                <Table.HeaderCell><FormattedMessage id="TodoList.Finished" defaultMessage="Finished" /></Table.HeaderCell>
                <Table.HeaderCell><FormattedMessage id="TodoList.Description" defaultMessage="Description" /></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
  
             <Table.Body>
              {entries.map(function(item,i){
                return (<TodoEntry entry={item[1]} actualKey={item[0]} removeEntry={removeEntry} key={item[0]} modifyEntry={modifyEntry}/>)
                })} 
            </Table.Body>
          </Table>
          <NewEntryInput addEntry={this.addEntry}/>
        </div>
      )
    }
}

export default TodoList;