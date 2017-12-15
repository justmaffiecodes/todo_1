import React, {
  Component
} from 'react';
import { Container } from 'semantic-ui-react';
import TodoList from './components/TodoList';

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