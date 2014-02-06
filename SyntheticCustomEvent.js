"use strict";

var SyntheticEvent = require('react/lib/SyntheticEvent');

/**
 * @interface CustomEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#interface-CustomEvent
 */
var CustomEventInterface = {
  detail: null,
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticCustomEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(SyntheticCustomEvent, CustomEventInterface);

module.exports = SyntheticCustomEvent;

