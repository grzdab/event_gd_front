import {clearCurrentItem} from "../helpers/ComponentHelper";

export function compareObjects(object1, object2) {
    const keys1 = Object.keys(object1); // backup
    const keys2 = Object.keys(object2); // current
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      const areArrays = val1 instanceof Array && val2 instanceof Array;

      if (areArrays) {
        if (val1.length !== val2.length) {
          return false
        };
        const combined = val1.concat(val2);
        for (const val of combined) {
          if (combined.filter((obj) => obj.id === val.id).length !== 2) {
            return false
          }
        }
        return true;
      }
      if (areObjects && !compareObjects(val1, val2) || !areObjects && val1 !== val2) {
        return false;
      }
    }
    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

export function resetInvalidInputField(fieldId) {
    const inputField = document.getElementById(fieldId);
    if (inputField) {
      inputField.placeholder = "";
      inputField.classList.remove("form-input-invalid");
    }
}

