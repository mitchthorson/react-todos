
var React = require('react');

var App = require('./components/app');

var TodoActions = require('./actions/TodoActions');

TodoActions.fetch()

React.render(<App />, document.getElementById('react'));

    