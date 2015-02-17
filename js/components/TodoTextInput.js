var React = require('react');

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },
    render: function() {
        return (
                <input
                    className={this.props.className + ' form-control'}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    onBlur={this._save}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
                    autoFocus={true}
                />
                
        );
    },
    _save: function() {
        console.log(this.props.onSave);
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    },

    _onChange: function(event) {
        this.setState({
          value: event.target.value
        });
    },

    _onKeyDown: function(event) {
        if (event.keyCode == ENTER_KEY_CODE) {
            this._save();
        }
    }

});

module.exports = TodoTextInput;