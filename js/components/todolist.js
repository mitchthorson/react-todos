var React = require('react');
var TodoItem = require('./TodoItem');



var TodoList = React.createClass({
        render:function(){
            var allTodos = this.props.allTodos;
            var todos = [];
            

            for (var key in allTodos) {
              todos.push(<TodoItem key={key} todo={allTodos[key]} />);
            }
            
            return (
                    <ul className="list-group">{todos}</ul>
                    
                )
        }
    });

module.exports = TodoList;   