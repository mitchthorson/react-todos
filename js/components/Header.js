var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput');

Header = React.createClass({
    render: function() {
        return (
            <header id='header'>
                <h1>Todos</h1>
                <TodoTextInput
                    id='new-todo'
                    placeholder='What needs to be done?'
                    onSave={this._onSave}
                />
            </header>
        );
    },

    _onSave: function(text) {
        if (text.trim()) {
            TodoActions.create({
                todo_name: text,
                todo_is_done: false
            });
        }
        
    }
});

module.exports = Header;