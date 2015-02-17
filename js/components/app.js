var React = require('react');
var TodoList = require('./todolist');
var Header = require('./Header');
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
                    <div className='container-fluid'>
                        <Header />
                        <TodoList allTodos={this.state} />
                    </div>
                 )
        },
        _onChange: function() {
            this.setState(TodoStore.getAll());
        }
    });

module.exports = App;