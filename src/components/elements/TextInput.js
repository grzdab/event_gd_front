import React from 'react';
import {resetInvalidInputField} from "../../helpers/ComponentHelper";

const TextInput = ({propertyName, itemName, itemData, state, required, disabled, readonly, value, style}) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;
  const getItemData = itemData;

  return (
    <>
      <input style={ style }
        type = "text"
        id = { propertyName }
        name = { propertyName }
        defaultValue = {
          itemName ?
            currentItem[itemName][propertyName] :
            currentItem[propertyName]}
        className = "form-control"
        required = { required }
        disabled={ disabled }
        readOnly = { readonly }
        value = { value }
        onChange = {(item) => {
          console.log("itemName: " + itemName)
          setItemChanged(!itemChanged);
          setCurrentItem(currentItem => !itemName ?
            ({...currentItem, [propertyName]: item.target.value}) :
            ({...currentItem, [itemName]: getItemData()})
          );
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
