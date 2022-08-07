import React from 'react';
import {resetInvalidInputField} from "../../helpers/ComponentHelper";

const TextInput = ({propertyName, state, required}) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;

  return (
    <>
      <input
        type = "text"
        id = { propertyName }
        name = { propertyName }
        defaultValue = { currentItem[propertyName] }
        className = "form-control"
        required = { required }
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
