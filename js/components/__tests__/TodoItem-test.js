jest.dontMock('../TodoItem');

describe('TodoItem', function() {
    it('should exist', function() {
        var React = require('react/addons');
        var TodoItem = require('../TodoItem');
        var TestUtils = React.addons.TestUtils;

        var test_todo = {
            todo_name: 'name',
            todo_is_done: false,
            id: 'x'
        };

        var todoItem = TestUtils.renderIntoDocument(
            <TodoItem todo={test_todo}/>);
        expect(TodoItem).toBeDefined();

    });
});