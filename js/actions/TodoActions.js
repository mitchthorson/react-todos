var AppDispatcher = require('../dispatcher/dispatcher');
var jQuery = require('jquery');


var TodoActions = {
    create: function(todoObj) {
        AppDispatcher.dispatch({
            actionType: 'TODO_CREATE',
            todoObj: todoObj
        });
    },

    fetch: function() {
        
        var _this = this;
        jQuery.getJSON('http://mitch-api.herokuapp.com/todos', function(data) {
             
            for (var i = 0; i < data.todos.length; i++) {
                _this.create(data.todos[i]);
            }
        });
    },

    updateName: function(todoObj) {
        AppDispatcher.dispatch({
            actionType: 'TODO_UPDATE_NAME',
            todoObj: todoObj
        });
    },

    toggleComplete: function(todoObj) {
        if (todoObj.todo_is_done) {
            AppDispatcher.dispatch({
                actionType: "TODO_UNDO_COMPLETE",
                todoObj: todoObj
            });
        } else {
            AppDispatcher.dispatch({
                actionType: "TODO_COMPLETE",
                todoObj: todoObj
            });
        }
    },

    destroy: function(todoObj) {
        AppDispatcher.dispatch({
            actionType: "TODO_DESTROY",
            todoObj: todoObj
        });
    }
};

module.exports = TodoActions;