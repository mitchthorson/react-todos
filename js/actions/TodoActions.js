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
             AppDispatcher.dispatch({
                actionType: 'TODO_CREATE',
                todoObj: data
            });
        }
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

        jQuery.ajax({
            type: "PUT",
            contentType: "application/json",
            url: 'http://mitch-api.herokuapp.com/todos/' + todoObj.id,
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
             AppDispatcher.dispatch({
                actionType: 'TODO_UPDATE_NAME',
                id: todoObj.id,
                todo_name: todoObj.todo_name
            });
        }
    },

    toggleComplete: function(todoObj) {
        var payload = todoObj;
             payload.todo_is_done = !todoObj.todo_is_done;
         jQuery.ajax({
                type: "PUT",
                contentType: "application/json",
                url: 'http://mitch-api.herokuapp.com/todos/' + todoObj.id,
                processData: false,
                data: JSON.stringify(payload),
                success: success,
                dataType: "json",
                error: error
            });
            function error(request, status) {
                console.log(status);
                console.log(request);
            }
            function success(data) {
                if (!todoObj.todo_is_done) {
                     AppDispatcher.dispatch({
                        actionType: 'TODO_UNDO_COMPLETE',
                        todoObj: todoObj
                    });
                } else {
                     AppDispatcher.dispatch({
                        actionType: "TODO_COMPLETE",
                        todoObj: todoObj
                     });
                }
            }

    },

    destroy: function(todoObj) {
         jQuery.ajax({
            type: "DELETE",
            url: 'http://mitch-api.herokuapp.com/todos/' + todoObj.id,
            success: success,
            error: error
        });
         function success(r) {
            AppDispatcher.dispatch({
                actionType: "TODO_DESTROY",
                todoObj: r.deleted
            });
         }
         function error(e) {
            console.log('error');
         }
    }
};

module.exports = TodoActions;
