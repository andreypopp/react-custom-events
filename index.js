"use strict";

var React                 = require('react');
var EventPropagators      = require('react/lib/EventPropagators');
var ReactEventEmitter     = require('react/lib/ReactEventEmitter');
var EventPluginHub        = require('react/lib/EventPluginHub');
var merge                 = require('react/lib/merge');
var SyntheticCustomEvent  = require('./SyntheticCustomEvent');

var registrationNames       = ReactEventEmitter.registrationNames;
var isEventHandlerProp      = /^on[A-Z]/;
var evNamePrefix            = 'onCustomEvent:';

function dispatchEvent(component, evName, detail) {
  evName = evNamePrefix + evName;
  var event = SyntheticCustomEvent.getPooled(
    {phasedRegistrationNames: {bubbled: evName}},
    component._rootNodeID,
    {detail: detail}
  );
  EventPropagators.accumulateTwoPhaseDispatches(event);
  EventPluginHub.enqueueEvents(event);
  EventPluginHub.processEventQueue();
}

function putListener(component, evName, handler) {
  evName = evNamePrefix + evName;
  return EventPluginHub.putListener(component._rootNodeID, evName, handler)
}

function deleteListener(component, evName) {
  evName = evNamePrefix + evName;
  return EventPluginHub.deleteListener(component._rootNodeID, evName);
}

var CustomEventsListener = {

  __updateListeners: function(prevProps, nextProps) {
    var k;

    for (k in prevProps) {
      if (isEventHandlerProp.exec(k) && !registrationNames[k]) {
        deleteListener(this, prevProps[k]);
      }
    }

    for (k in nextProps) {
      if (isEventHandlerProp.exec(k) && !registrationNames[k]) {
        putListener(this, k, nextProps[k]);
      }
    }
  },

  componentDidUpdate: function(prevProps) {
    this.__updateListeners(prevProps, this.props);
  },

  componentDidMount: function() {
    this.__updateListeners({}, this.props);
  }
};

var CustomEventsDispatcher = {

  dispatch: function(name, detail) {
    dispatchEvent(this, evName, detail);
  }
};

var CustomEventsHandler = React.createClass({
  displayName: 'CustomEventsHandler',

  mixins: [CustomEventsListener],

  render: function() {
    return this.transferPropsTo(React.DOM.div(null, this.props.children));
  }
});

module.exports = {
  CustomEventsListener: CustomEventsListener,
  CustomEventsDispatcher: CustomEventsDispatcher,
  CustomEvents: CustomEventsDispatcher,
  dispatchEvent: function(component, name, detail) {
    var evName = 'on' + name.charAt(0).toUpperCase() + name.slice(1);
    return dispatchEvent(component, evName, detail);
  },
  CustomEventsHandler: CustomEventsHandler
};
