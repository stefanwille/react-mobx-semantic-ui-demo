import { action, extendObservable } from 'mobx';

let id = 1;

class TodoStore {
  constructor() {
    extendObservable(this, {
      todos: [],
      filter: '',
      todoSelector: 'All', // All, Active, Completed

      get filteredTodos() {
        const todoMatchesFilter = todo =>
          todo.name.toUpperCase().includes(this.filter.toUpperCase());
        const todoMatchesSelector = todo => {
          switch (this.todoSelector) {
            case 'All':
              return true;
            case 'Active':
              return !todo.done;
            case 'Completed':
              return todo.done;
            default:
              throw new Error('Unknown selector' + this.todoSelector);
          }
        };
        return this.todos.filter(todoMatchesFilter).filter(todoMatchesSelector);
      },

      get elapsedTime() {
        return this.current - this.start + 'milliseconds';
      },

      get itemsLeft() {
        return this.todos.filter(todo => !todo.done).length;
      },

      addTodo: action(function(todo) {
        id += 1;
        todo.id = id;
        this.todos.push(todo);
      }),

      updateTodo: action(function(index, newProperties) {
        this.todos[index] = { ...this.todos[index], ...newProperties };
      }),

      removeTodo: action(function(index) {
        this.todos.splice(index, 1);
      })
    });
  }
}

export default TodoStore;
