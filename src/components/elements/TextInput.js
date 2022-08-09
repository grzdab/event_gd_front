import React from 'react';
import {resetInvalidInputField} from "../../helpers/ComponentHelper";

const TextInput = ({propertyName, state, required, disabled, readonly, value, style}) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;

  const setForegroundColor = (backgroundColorHex) => {
    const red = parseInt(backgroundColorHex.substring(1,3), 16);
    const green = parseInt(backgroundColorHex.substring(3,5), 16);
    const blue = parseInt(backgroundColorHex.substring(5), 16);
    console.log(backgroundColorHex);
    console.log(red + "." + green + "." + blue);
    console.log(red*0.299 + green*0.587 + blue*0.114);
    return (red*0.299 + green*0.587 + blue*0.114) > 140 ? "black" : "white"
  }

  return (
    <>
      <input style={currentItem?.color && {backgroundColor: `${currentItem.color}`, color: setForegroundColor(currentItem.color)}}
        // style = { style }
        type = "text"
        id = { propertyName }
        name = { propertyName }
        defaultValue = { currentItem[propertyName] }
        className = "form-control"
        required = { required }
        disabled={ disabled }
        readOnly = { readonly }
        value = { value }
        onChange = { (item) => {
          setItemChanged(!itemChanged);
          setCurrentItem(currentItem => ({...currentItem,
            [propertyName]: item.target.value}));
          setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
        }}
        onClick = {() => {
          resetInvalidInputField(propertyName);
        }}
      ></input>
    </>
  );
};

export default TextInput;
