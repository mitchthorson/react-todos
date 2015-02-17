var React = require('react');
var TodoList = require('./todolist');
var Header = require('./Header');
var TodoStore = require('../stores/TodoStore');



var App = React.createClass({

        getInitialState: function() {
            return {
                todos: TodoStore.getAll()
            };
        },
        componentDidMount: function() {
            TodoStore.addChangeListener(this._onChange);
        },
        
        render:function() {
            allTodos = this.state.todos;
            return (
                    <div className='container-fluid'>
                        <Header />
                        <TodoList allTodos={allTodos} />
                    </div>
                 )
        },
        _onChange: function() {
            this.setState({todos: TodoStore.getAll()});
        }
    });

module.exports = App;