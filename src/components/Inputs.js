import React, { Component } from 'react';
import { Button, Icon, Modal, Form,  } from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl';

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
      var onClick=function(event, data){this.setState({modalOpen:true})}.bind(this)
      var handleSubmit=this.onSubmit.bind(this)
      var onChange=this.onChange.bind(this)
      return (
        <div>
          <center><Button color="green" onClick={onClick}><center><Icon name="add circle" color="black" inverted={true}/></center></Button></center>
          <Modal open={this.state.modalOpen} onClose={()=>{this.setState({modalOpen:false})}} closeIcon>
              <Modal.Header>
                 <FormattedMessage id="Inputs.NewTodoEntry" defaultMessage="Add New Todo Entry" />
              </Modal.Header>
              <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                      <Form.Input type='text' name='name' label={<FormattedMessage id='Inputs.Name' defaultMessage="Name" />} onChange={onChange} value={this.state.formData.name}/>
                    </Form.Field>
                    <Form.Field>
                    <Form.Input type='text' name='description' label={<FormattedMessage id='Inputs.Description' defaultMessage="Description" />} onChange={onChange} value={this.state.formData.description}/>
                    </Form.Field>
                    <Button primary type='submit'>{<FormattedMessage id='Inputs.Submit' defaultMessage="Submit" />}</Button>
                </Form>
              </Modal.Content>
          </Modal>
        </div>
      );
    }
}
  

export { NewEntryInput };