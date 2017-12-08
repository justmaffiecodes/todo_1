import React, {
  Component
} from 'react';
import { Container, Table, Button, Icon, Form, Message , Modal } from 'semantic-ui-react'

class DeleteButton extends Component{
  render(){
    return (<Button onClick={this.props.onClick} color="youtube" icon><Icon name="delete"/></Button>)
  }
}

class FinishButton extends Component{
  render(){
    return (<Button onClick={this.props.onClick} color="green" icon><Icon name="check"/></Button>)
  }
}

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
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Finished</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
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

class NewEntryInput extends Component{
  constructor() {
    super();
    this.state = {
      formData: {name:"",description:""},
      modalOpen: false
    };
    this.render = this.render.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event, formData){
    var old = this.state.formData
    old[formData.name] = formData.value
    this.setState({formData:old})
  }

  onSubmit(event, formData){
    event.preventDefault()
    formData = this.state.formData
    if(formData.name === "" | formData.description === ""){
      return
    }
    this.props.addEntry(formData)
    this.setState({formData:{name:"",description:""}, modalOpen:false})
  }

  render() {
    const {formData}=this.state;
    var onClick=function(event, data){this.setState({modalOpen:true})}.bind(this)
    var handleSubmit=this.onSubmit.bind(this)
    var onChange=this.onChange.bind(this)
    return (
      <div>
        <center><Button color="green" onClick={onClick}><center><Icon name="add circle" color="black" inverted={true}/></center></Button></center>
        <Modal open={this.state.modalOpen} onClose={()=>{this.setState({modalOpen:false})}} closeIcon>
            <Modal.Header>
                Add New Todo Entry
            </Modal.Header>
            <Modal.Content>
              <Form onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Input type='text' name='name' label="name" placeholder="Name" onChange={onChange} value={this.state.formData.name}/>
              </Form.Field>
              <Form.Field>
                <Form.Input type='text' name='description' label="description" placeholder="Description" onChange={onChange} value={this.state.formData.description}/>
              </Form.Field>
            <Button primary type='submit'>Submit</Button>

                <Message>
                  <pre>formData: {JSON.stringify(formData, null, 2)}</pre>
                </Message>
              </Form>
            </Modal.Content>
        </Modal>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <TodoList />
      </Container>
    );
  }
}

export default App;