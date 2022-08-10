import React from 'react';
import TextInput from "../../../elements/TextInput";

const UserRolesCard = ({ state }) => {

  return (
    <>
      <div className="card">
        <div className="card-header">
          User roles
        </div>
        <div className="card-body">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
              <label className="form-check-label" htmlFor="flexCheckDefault">Default checkbox</label>
            </div>
        </div>
      </div>
    </>
  );
};

export default UserRolesCard;
