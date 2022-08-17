import React from 'react';
import TextInput from "../../../elements/TextInput";

const UserContactCard = ({ state }) => {

  const currentItem = state.currentItem;
  const getItemData = () => {
    return ({
      id: currentItem.contact.id,
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
        <div className="card-body form-obj" id="contact">
          {/*{ currentItem ? (<>*/}
            <label htmlFor="phone" className="">Phone number</label>
            <TextInput propertyName="phone" itemName={currentItem.contact !== undefined ? "contact" : null} itemData={ getItemData } state={state} disabled ={false} />
            <label htmlFor="email" className="">Email address</label>
            <TextInput propertyName="email" itemName={currentItem.contact !== undefined ? "contact" : null} itemData={ getItemData } state={state} disabled ={false} />
          {/*</>) : ""}*/}
        </div>
      </div>
    </>
  );
};

export default UserContactCard;
