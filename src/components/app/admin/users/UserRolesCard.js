import React from 'react';
import TextInput from "../../../elements/TextInput";

const UserRolesCard = ({ state, appRoles }) => {


  const currentItem = state.currentItem;
  const userRoles = currentItem.userRoles;
  const setCurrentItem = state.setCurrentItem;
  const setCurrentFormState = state.setCurrentFormState;
  const currentFormState = state.currentFormState;

  return (
    <>
      <div className="card">
        <div className="card-header">
          User roles
        </div>
        <div className="card-body">
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
                    defaultChecked={contains}
                    onChange={(e) => {
                      console.log(userRoles?.filter(e => e.name === role.name).length > 0);
                      let filtered = userRoles.filter(function(el) { return el.id !== "Kristian"; });
                      // TODO complete
                      // muszę wziąć obiekt userRoles z currentItem
                      // sprawdzić jego nazwę i czy jest checked
                      // jeśli jest checked (e.currentTarget.checked), to upewnić się że jest na liście ról użytkownika
                      // jeśli nie jest checked, to usunąć go z listy ról użytkownika
                      // zastąpić obiekt userRoles zaktualizowanym obiektem

                      // setCurrentItem({...currentItem,
                      //   userRoles: e.currentTarget.checked});
                      // setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                    }}
                  />
                </div>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default UserRolesCard;
