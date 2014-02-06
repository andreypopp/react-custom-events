/**
 * @jsx React.DOM
 */

var React         = require('react');
var customEvents  = require('../');

// component which can handle CustomEvents
var CustomEventsHandler = customEvents.CustomEventsHandler;

// function to dispatch custom events
var dispatchEvent       = customEvents.dispatchEvent;

var Parent = React.createClass({
  onHello: function(ev) {
    console.log('got it', ev.detail);
  },

  render: function() {
    return (
      <CustomEventsHandler onHello={this.onHello}>
        <Child />
        <Child />
      </CustomEventsHandler>
    );
  }
});

var Child = React.createClass({
  onClick: function() {
    dispatchEvent(this, 'hello', 'Hi!');
  },

  render: function() {
    return <div onClick={this.onClick}>Say hello!</div>;
  }
});

window.onload = function() {
  React.renderComponent(Parent(), document.body);
}
