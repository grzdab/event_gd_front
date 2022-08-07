import React from 'react';
import {resetInvalidInputField} from "../../js/CommonHelper";

const Select = ({label, propertyName, required, state, itemsList, selectName }) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;


  return (
    <>
      <select className="form-select"
        aria-label = { selectName }
        id = { propertyName }
        name = { propertyName }
        defaultValue = {
          currentItem[propertyName]?.id > 0
          ? currentItem[propertyName].id
          : ""
        }

        onChange={(e) => {
          setCurrentItem({...currentItem, equipmentCategory: {...currentItem.equipmentCategory, id: parseInt(e.target.value)} })
          setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
        }}

        onClick={() => {
          resetInvalidInputField("equipmentCategoryId");
        }}
      >
        <option disabled value=""> -- Select { selectName } -- </option>
        {itemsList.map((e) => (
          <option key={e.id} value={e.id}>{e.name}</option>))
        }
      </select>
    </>
  );
};

export default Select;
