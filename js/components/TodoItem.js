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
                  value={todo.todo_name}
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
                      {input}
                      <button className="destroy btn btn-danger btn-sm item-delete-button" onClick={this._onDestroyClick}>Delete</button>
                    </div>
                     
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
                console.log(this.props.todo.todo_is_done);
                TodoActions.updateName({
                    id: this.props.todo.id, 
                    todo_name: text, 
                    todo_is_done: this.props.todo.todo_is_done
                });
                this.setState({isEditing: false});
          },

          _onDestroyClick: function() {
                TodoActions.destroy(this.props.todo);
          }
    });

module.exports = TodoItem;