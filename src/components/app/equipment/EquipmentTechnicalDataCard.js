import React from 'react';
import NumberInput from "../../elements/NumberInput";
import TextInput from "../../elements/TextInput";

const EquipmentTechnicalDataCard = ({ state }) => {

  const currentItem = state.currentItem;

  return (
    <>
      <div className="card-header">
        Technical data
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="length" className="">Length
              (cm)</label>
            <NumberInput propertyName="length" state = { state } min = "0" disabled ={ false }/>
            <label htmlFor="width" className="">Width
              (cm)</label>
            <NumberInput propertyName="width" state = { state } min = "0" disabled ={ false }/>
            <label htmlFor="height>" className="">Height
              (cm)</label>
            <NumberInput propertyName="height" state = { state } min = "0" disabled ={ false }/>
          </div>
          <div className="col-md-6">
            <label htmlFor="area" className="">Area
              (m<sup>2</sup>)</label>
            <TextInput propertyName="area" state = { state } disabled ={ true } value = {
              (currentItem?.length && currentItem?.width) ?
                (currentItem.length * currentItem.width) : 0
            }/>
            <label htmlFor="weight" className="">Weight
              (kg)</label>
            <NumberInput propertyName="weight" state = { state } min = "0" disabled ={ false }/>
            <label htmlFor="power>" className="">Power
              (kW)</label>
            <NumberInput propertyName="powerRequired" state = { state } min = "0" disabled ={ false }/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentTechnicalDataCard;
