# react-custom-events

**Don't use this, this was an experiment and it doesn't work anymore with recent versions of React.**

Plugin for [React][1] which implements CustomEvents with bubbling. I know it's a
bad idea but who would judge you? Use with care.

## Installation

Install via npm:

    % npm install react-custom-events

## Usage

Required imports:

    var React         = require('react');
    var customEvents  = require('react-custom-events');

There's a component class which can handle CustomEvents:

    var CustomEventsHandler = customEvents.CustomEventsHandler;

and a function to dispatch custom events:

    var dispatchEvent       = customEvents.dispatchEvent;

Define a `Parent` component which would catch events via `CustomEventsHandler`:

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

and a `Child` which can dispatch events up the component tree:

    var Child = React.createClass({
      onClick: function() {
        dispatchEvent(this, 'hello', 'Hi!');
      },

      render: function() {
        return <div onClick={this.onClick}>Say hello!</div>;
      }
    });

That's it!

[1]: https://facebook.github.io/react
