var AppDispatcher = require('../dispatcher/dispatcher');
var jQuery = require('jquery');


var TodoActions = {
    create: function(todoObj) {
        jQuery.ajax({
            type: "POST",
            contentType: "application/json",
            url: 'http://mitch-api.herokuapp.com/todos',
            processData: false,
            data: JSON.stringify(todoObj),
            success: success,
            dataType: "json",
            error: error
        });
        function error(request, status) {
            console.log(status);
            console.log(request);
        }
        function success(data) {
            console.log('server response');
            console.log(data);
        }
        AppDispatcher.dispatch({
            actionType: 'TODO_CREATE',
            todoObj: todoObj
        });
    },

    fetch: function() {
        
        var _this = this;
        jQuery.getJSON('http://mitch-api.herokuapp.com/todos', function(data) {
            var todoArray = data.todos;
            AppDispatcher.dispatch({
                actionType: 'TODO_FETCH',
                todoArray: todoArray
            });     
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