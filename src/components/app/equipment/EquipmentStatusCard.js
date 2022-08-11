import React from 'react';
import Select from "../../elements/Select";

const EquipmentStatusCard = ({ state, statusesList, ownershipTypesList }) => {

  const currentItem = state.currentItem;
  const setCurrentItem = state.setCurrentItem;
  const setCurrentFormState = state.setCurrentFormState;
  const currentFormState = state.currentFormState;

  return (
    <>
      <div className="card-header">
        Status
      </div>
      <div className="card-body">
        <div className="form-check form-switch">
          <label htmlFor="in_use" className="form-check-label">In use</label>
          <input
            className="form-check-input"
            type="checkbox"
            id="inUse"
            name="inUse"
            checked={currentItem.inUse}
            onChange={(e) => {
              setCurrentItem({...currentItem,
                inUse: e.currentTarget.checked});
              setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
            }}
          />
        </div>
        <label htmlFor="equipmentOwnership" className="">Ownership</label>
        <Select
          label = "Ownership type"
          propertyName = "equipmentOwnershipId"
          required = { false }
          state = { state }
          itemsList = { ownershipTypesList }
          itemName = "equipmentOwnership"
        />
        <label htmlFor="equipmentStatus" className="">Status</label>
        <Select
          label = "Equipment status"
          propertyName = "equipmentStatusId"
          required = { false }
          state = { state }
          itemsList = { statusesList }
          itemName = "equipmentStatus"
        />
      </div>
    </>
  );
};

export default EquipmentStatusCard;
