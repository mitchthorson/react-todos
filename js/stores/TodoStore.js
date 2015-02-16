var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function create(todoObj) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = todoObj.id
  console.log(todoObj);
  _todos[id] = {
    id: id,
    todo_is_done: todoObj.todo_is_done,
    todo_name: todoObj.todo_name
  };
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {
    areAllComplete: function() {
        for (var id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    },

    getAll: function() {
        return _todos
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

AppDispatcher.register(function(action) {
    var todoObj;

    switch(action.actionType) {
        case 'TODO_CREATE':
            todoObj = action.todoObj;

            if (todoObj.todo_name !== '') {
                create(todoObj);
            }
            TodoStore.emitChange();
            break;

        case 'TODO_UNDO_COMPLETE':
            update(action.todoObj.id, {todo_is_done: false});
            TodoStore.emitChange();
            break;

        case 'TODO_COMPLETE':
            update(action.todoObj.id, {todo_is_done: true});
            TodoStore.emitChange();
            break;

        case 'TODO_UPDATE_NAME':
            var name = action.todoObj.todo_name;
            if (name !== '') {
                update(action.todoObj.id, {todo_name: name});
            }
            TodoStore.emitChange();
            break;

        case 'TODO_DESTROY':
            destroy(action.todoObj.id);
            TodoStore.emitChange();
            break;

        case 'TODO_FETCH':
            var todos = action.todoArray;
            
            for (var i = 0; i < todos.length; i++ ) {
                
                create(todos[i]);
            }
            
            TodoStore.emitChange();
            break;
    }
});

module.exports = TodoStore;