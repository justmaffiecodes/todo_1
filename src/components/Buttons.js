import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react'
  
class DeleteButton extends Component{
  render(){
    return (<Button onClick={this.props.onClick} color="youtube" icon><Icon name="delete"/></Button>)
  }
}
  
class FinishButton extends Component {
    render(){
      return (<Button onClick={this.props.onClick} color="green" icon><Icon name="check"/></Button>)
    }
}

export { FinishButton, DeleteButton }