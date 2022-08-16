import React from 'react';
import TextInput from "../../../elements/TextInput";

const UserContactCard = ({ state }) => {

  const getItemData = () => {
    return ({
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value
    })
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          Contact
        </div>
        <div className="card-body">
          <label htmlFor="phone" className="">Phone number</label>
          <TextInput propertyName="phone" itemName="contact" itemData={ getItemData } state = { state } disabled ={ false } />
          <label htmlFor="email" className="">Email address</label>
          <TextInput propertyName="email" itemName="contact" itemData={ getItemData } state = { state } disabled ={ false } />
        </div>
      </div>
    </>
  );
};

export default UserContactCard;
