var React = require('react');
var TodoList = require('./todolist');
var TodoStore = require('../stores/TodoStore');



var tempTodos = [
    {
        'todo_name': 'Learn React',
        'todo_is_done': false,
        'id': 1
    },
    {
        'todo_name': 'Learn Flux',
        'todo_is_done': false,
        'id': 2
    }
]

var App = React.createClass({

        getInitialState: function() {
            return TodoStore.getAll();
        },
        componentDidMount: function() {
            TodoStore.addChangeListener(this._onChange);
        },
        
        render:function() {
            allTodos = this.state;
            return (
                    <TodoList allTodos={allTodos} />
                )
        },
        _onChange: function() {
            this.setState(TodoStore.getAll());
        }
    });

module.exports = App;