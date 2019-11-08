import { nativeTypesConfig } from './nativeTypesConfig';
import { NativeDragSource } from './NativeDragSource';
export function createNativeDragSource(type) {
  return new NativeDragSource(nativeTypesConfig[type]);
}
export function matchNativeItemType(dataTransfer) {
  if (!dataTransfer) {
    return null;
  }

  var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
  return Object.keys(nativeTypesConfig).filter(function (nativeItemType) {
    var matchesTypes = nativeTypesConfig[nativeItemType].matchesTypes;
    return matchesTypes.some(function (t) {
      return dataTransferTypes.indexOf(t) > -1;
    });
  })[0] || null;
}