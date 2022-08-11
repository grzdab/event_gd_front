import React from 'react';
import {resetInvalidInputField} from "../../js/CommonHelper";
import {getItemById} from "../../helpers/ComponentHelper";

const Select = ({label, propertyName, required, disabled, state, itemsList, itemName }) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;

  return (
    <>
      <select className="form-select"
        aria-label = { label }
        id = { itemName }
        name = { propertyName }
        required = { required }
        disabled = { disabled }
        defaultValue = {
          currentItem[itemName]?.id > 0
            ? currentItem[itemName].id
            : ""
        }
        onChange={(e) => {
          const relatedObject = getItemById(itemsList, parseInt(e.target.value));
          setCurrentItem({...currentItem, [itemName]: relatedObject })
          setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
          setItemChanged(!itemChanged);
        }}
        onClick={() => {
          resetInvalidInputField(propertyName);
        }}
      >
        <option disabled value=""> -- Select { label } -- </option>
        {itemsList.map((e) => (
          <option key={e.id} value={e.id}>{e.name}</option>))
        }
      </select>
    </>
  );
};

export default Select;
