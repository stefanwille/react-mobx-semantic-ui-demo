import React, { Component } from 'react';
import './App.css';
import { inject, Provider, observer } from 'mobx-react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Checkbox, Table, Input, Icon } from 'semantic-ui-react';

import TodoStore from './TodoStore';

// Following
// http://chenglou.github.io/react-motion/demos/demo3-todomvc-list-transition/

const Header = () => (
  <header className="App-header">
    <h1 className="App-title">Welcome to MobX and Semantic UI</h1>
  </header>
);

const TodoList = inject('todoStore')(
  observer(
    class TodoList extends React.Component {
      render() {
        const { todoStore } = this.props;
        return (
          <div>
            <Table className="table table-bordered">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>Done</Table.HeaderCell>
                  <Table.HeaderCell width={13}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {todoStore.filteredTodos.map((todo, index) => (
                  <Table.Row key={todo.id}>
                    <Table.Cell>
                      <Checkbox
                        slider
                        checked={todo.done}
                        onChange={() =>
                          todoStore.updateTodo(index, {
                            done: !todo.done
                          })
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{todo.name}</Table.Cell>
                    <Table.Cell>
                      <Button icon onClick={() => todoStore.removeTodo(index)}>
                        <Icon name="delete" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    {todoStore.itemsLeft} items left &nbsp; &nbsp; &nbsp;&nbsp;
                    &nbsp;
                    <Input
                      placeholder="Filter"
                      value={todoStore.filter}
                      onChange={event => {
                        todoStore.filter = event.target.value;
                      }}
                      icon={{ name: 'filter' }}
                    />
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button.Group>
                      {['All', 'Active', 'Completed'].map(selector => (
                        <Button
                          key={selector}
                          active={todoStore.todoSelector === selector}
                          onClick={() => (todoStore.todoSelector = selector)}
                        >
                          {selector}
                        </Button>
                      ))}
                    </Button.Group>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        );
      }
    }
  )
);

const AddTodoButton = inject('todoStore')(({ todoStore }) => {
  return (
    <Button
      onClick={() => {
        todoStore.addTodo({
          name: 'You can do it',
          done: false
        });
      }}
    >
      Add Todo
    </Button>
  );
});

class App extends Component {
  todoStore = new TodoStore();

  componentDidMount() {
    const todos = [
      { name: 'Sleep', done: false },
      {
        name: 'Try to finish conference slides',
        done: false
      },
      {
        name: 'Eat cheese and drink wine',
        done: false
      },
      { name: 'Go around in Uber', done: false },
      { name: 'Talk with conf attendees', done: false },
      { name: 'Show Demo 1', done: true },
      { name: 'Show Demo 2', done: true },
      { name: 'Show Secret Demo', done: true },
      {
        name: 'Lament about the state of animation',
        done: false
      },
      { name: 'Go home', done: false }
    ];
    todos.forEach(todo => this.todoStore.addTodo(todo));
  }

  render() {
    return (
      <Provider todoStore={this.todoStore}>
        <div className="ui container">
          <Header />
          <AddTodoButton />
          <br />
          <br />
          <TodoList />
        </div>
      </Provider>
    );
  }
}

export default App;
