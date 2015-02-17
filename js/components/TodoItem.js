var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput');

var cx = require('react/lib/cx');

var TodoItem = React.createClass({
        getInitialState: function() {
            return {
                isEditing: false
            }
        },
        render:function() {
            var todo = this.props.todo;
            var input;
            if (this.state.isEditing) {
              input =
                <TodoTextInput
                  className="edit"
                  onSave={this._onSave}
                  value={todo.text}
                />;
            }
            return (
                    <li className={cx({
                        'completed': todo.todo_is_done,
                        'editing': this.state.isEditing
                    }) + " list-group-item"}>

                     <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.todo_is_done}
                        onChange={this._onToggleComplete}
                      />
                      <label onDoubleClick={this._onDoubleClick}>
                        {todo.todo_name}
                      </label>
                      <button className="destroy btn btn-danger" onClick={this._onDestroyClick}>Delete</button>
                    </div>
                    {input} 
                     </li>
                )
        },
         _onToggleComplete: function() {
            TodoActions.toggleComplete(this.props.todo);
          },

          _onDoubleClick: function() {
            this.setState({isEditing: true});
          },

           _onSave: function(text) {
                TodoActions.updateName(this.props.todo.id, text);
                this.setState({isEditing: false});
          },

          _onDestroyClick: function() {
                TodoActions.destroy(this.props.todo);
          }
    });

module.exports = TodoItem;