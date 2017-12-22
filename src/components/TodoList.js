import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { NewEntryInput } from './Inputs';
import TodoEntry from './TodoEntry';
import {FormattedMessage} from 'react-intl';
import {LanguageSelector} from './LanguageSelector'
  
class TodoList extends Component {
    constructor(props) {
      super(props)
      var todo_entries = new Map()
      this.load = this.load.bind(this)      
      this.state={todo_entries:this.load(todo_entries)}
      this.removeEntry = this.removeEntry.bind(this)
      this.addEntry = this.addEntry.bind(this)
      this.render = this.render.bind(this)
      this.modifyEntry = this.modifyEntry.bind(this)
      this.shouldSave = false;
    }

    load(todo_entries){
      var data = []
      if(localStorage.getItem("todo") !== null){
        data = JSON.parse(localStorage.getItem("todo")).data
      }
      for(var entry in data){
        entry = data[entry]
        if(entry.finished === null){
          entry.finished = false;
        }
        todo_entries.set(entry.key, entry)
      }
      return todo_entries
    }

    save(){
      var f = Array.from(this.state.todo_entries.values())
      var data = JSON.stringify({data:f});
      console.log(data)
      console.log(f)
      localStorage.setItem("todo", data)
    }
  
    addEntry(entry){
      var key = entry.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').toLowerCase()
      if(entry.finished === null){
        entry.finished = false;
      }
      entry.key = key
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
      if(this.shouldSave){
        this.save()
      }
      this.shouldSave = true;
      var removeEntry = this.removeEntry
      var modifyEntry = this.modifyEntry
      var entries = Array.from(this.state.todo_entries.entries())
      return (
        <div className="todoList">
          <LanguageSelector language={this.props.language}/>
          <br />
          <br />
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