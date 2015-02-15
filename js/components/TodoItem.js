var React = require('react');

var TodoItem = React.createClass({
        render:function() {
            var todo = this.props.todo;
            return (
                    <li className="list-group-item">

                     {todo.todo_name} 
                     </li>
                )
        }
    });

module.exports = TodoItem;