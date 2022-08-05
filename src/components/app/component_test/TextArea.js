import React from 'react';

const TextArea = ({propertyName, rows, state, required}) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;

  return (
    <>
      <textarea
        id = { propertyName }
        name = { propertyName }
        rows = { rows }
        defaultValue = { currentItem[propertyName] }
        className = "form-control md-textarea"
        required = { required }
        onChange = {(item) => {
          setItemChanged(!itemChanged);
          setCurrentItem(currentItem => ({...currentItem,
            [propertyName]: item.target.value}));
          setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
        }}
      ></textarea>
    </>
  );
};

export default TextArea;
