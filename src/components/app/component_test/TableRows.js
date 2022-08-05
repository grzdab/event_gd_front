import React from 'react';
import {onItemsListInfoButtonClick} from "../../../helpers/ComponentHelper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";

const TableRows = ({ itemsList, setCurrentItem, setBackupItem, currentFormState, setCurrentFormState, checkRelatedEquipment, getRelatedEquipmentByOwnershipId }) => {

  return (
    <>
      {itemsList.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td><button className='btn btn-outline-info' onClick={() => {
            getRelatedEquipmentByOwnershipId(item.id)
            setCurrentItem(item);
            setBackupItem(item);
            onItemsListInfoButtonClick(currentFormState, setCurrentFormState, "Edit equipment ownership type");
          }}><FontAwesomeIcon icon={faEye}/></button></td>
          <td><button className='btn btn-outline-danger' onClick={() => {
            setCurrentItem(item);
            checkRelatedEquipment(item.id);
          }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
        </tr>
      ))}
    </>
  );
};

export default TableRows;
