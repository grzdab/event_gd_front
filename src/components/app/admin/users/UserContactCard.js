import React from 'react';
import TextInput from "../../../elements/TextInput";

const UserContactCard = ({ state }) => {

  return (
    <>
      <div className="card">
        <div className="card-header">
          Contact
        </div>
        <div className="card-body">
          <label htmlFor="address" className="">Address</label>
          <TextInput propertyName="address" state = { state } disabled ={ false } />
          <label htmlFor="phone" className="">Phone number</label>
          <TextInput propertyName="phone" state = { state } disabled ={ false } />
          <label htmlFor="email" className="">Email address</label>
          <TextInput propertyName="email" state = { state } disabled ={ false } />
        </div>
      </div>
    </>
  );
};

export default UserContactCard;
