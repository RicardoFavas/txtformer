"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNativeDragSource = createNativeDragSource;
exports.matchNativeItemType = matchNativeItemType;

var _nativeTypesConfig = require("./nativeTypesConfig");

var _NativeDragSource = require("./NativeDragSource");

function createNativeDragSource(type) {
  return new _NativeDragSource.NativeDragSource(_nativeTypesConfig.nativeTypesConfig[type]);
}

function matchNativeItemType(dataTransfer) {
  if (!dataTransfer) {
    return null;
  }

  var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
  return Object.keys(_nativeTypesConfig.nativeTypesConfig).filter(function (nativeItemType) {
    var matchesTypes = _nativeTypesConfig.nativeTypesConfig[nativeItemType].matchesTypes;
    return matchesTypes.some(function (t) {
      return dataTransferTypes.indexOf(t) > -1;
    });
  })[0] || null;
}