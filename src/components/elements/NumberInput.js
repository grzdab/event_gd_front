import React from 'react';
import {resetInvalidInputField} from "../../helpers/ComponentHelper";

const NumberInput = ({propertyName, state, required, min, max, disabled}) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;

  return (
    <>
      <input style = {{backgroundColor: currentItem.color}}
             type = "number"
             id = { propertyName }
             name = { propertyName }
             min = { min }
             max = { max }
             defaultValue = { currentItem?.propertyName ? currentItem?.propertyName : 0}
             className = "form-control"
             required = { required }
             disabled = { disabled }
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

export default NumberInput;
