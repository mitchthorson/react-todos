var React = require('react');
var TodoList = require('./todolist');

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
       
        
        render:function() {
            allTodos = tempTodos;
            return (
                    <TodoList allTodos={allTodos} />
                )
        }
    });

module.exports = App;