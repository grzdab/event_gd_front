import React from 'react';
import NumberInput from "../../elements/NumberInput";

const EquipmentConditionsCard = ({ state }) => {

  // const currentItem = state.currentItem;

  return (
    <>
      <div className="card-header">
        Conditions
      </div>
      <div className="card-body">
        <label htmlFor="staff" className="">Required staff</label>
        <NumberInput propertyName="staffNeeded" state = { state } min = "0" disabled ={ false } />
        <label htmlFor="minimum_age" className="">Minimum age</label>
        <NumberInput propertyName="minimumAge" state = { state } min = "0" max = "99" disabled ={ false } />
        <label htmlFor="max_participants" className="">Max participants</label>
        <NumberInput propertyName="maxParticipants" state = { state } min = "0" disabled ={ false } />
      </div>
    </>
  );
};

export default EquipmentConditionsCard;
