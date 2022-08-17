import React, {useEffect, useState} from 'react';
import {resetInvalidInputField} from "../../../../helpers/ComponentHelper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const UserRolesCard = ({ state, appRoles }) => {

  const currentItem = state.currentItem;
  let userRoles = currentItem?.userRoles?.slice();
  const setCurrentItem = state.setCurrentItem;
  const setCurrentFormState = state.setCurrentFormState;
  const currentFormState = state.currentFormState;
  const itemChanged = state.itemChanged;
  const setItemChanged = state.setItemChanged;
  const backupItem = state.backupItem;
  const [rolesNote, setRolesNote] = useState(false);

  const onUserRolesChange = (e, role) => {
    if (e.currentTarget.checked) {
      userRoles.push({id: role.id, name: role.name});
    } else {
      userRoles = userRoles.filter((o) => {
        return o.id !== role.id;
      })
    }

    setCurrentItem(currentItem => ({...currentItem, userRoles: userRoles}));
    setItemChanged(!itemChanged);

    const userRolesDiv = document.getElementById("userRoles");
    if (userRoles.length > 0) {
      setCurrentFormState(currentFormState => ({...currentFormState, formSaveButtonDisabled: false, formDataValid: true}));
      setRolesNote(false);
    } else {
      userRolesDiv.classList.add("form-input-invalid");
      setCurrentFormState(currentFormState => ({...currentFormState, formDataValid: false}
      ));
      setRolesNote(true);
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          User roles
        </div>
        <div className="card-body" id="userRoles" >
          { userRoles && appRoles?.map((role) => {
            let contains = false;
            for (const userRole of userRoles) {
              if (userRole.name === role.name) {
                contains = true;
              }
            }
              return (
                <div className="form-check">
                  <label className="form-check-label" htmlFor={role.name}>{role.name}</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue={role.name}
                    id={role.name}
                    checked={contains}
                    onChange={(e) => onUserRolesChange(e, role)}
                    onClick={() => resetInvalidInputField("userRoles")}
                  />
                </div>
            )
          })}
        </div>
      </div>
      <p id="roles_note" className={rolesNote ? "err_info" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
        You have to asign a role to the user
      </p>
    </>
  );
};

export default UserRolesCard;
