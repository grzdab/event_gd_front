import React from 'react';
import {onItemsListInfoButtonClick} from "../../../helpers/ComponentHelper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import useCrud from "./useCrud";

const TableRows = ({ state, checkRelatedItems, formHeader }) => {

  const setCurrentItem = state.setCurrentItem;
  const itemsList = state.itemsList;
  const setBackupItem = state.setBackupItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const relatedItems = state.setRelatedItems;
  const { getRelatedChildrenByParentId } = useCrud();
  const equipmentOwnershipRelatedEquipmentUrl = "/equipment/ownership";

  return (
    <>
      {itemsList.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td><button className='btn btn-outline-info' onClick={() => {
            getRelatedChildrenByParentId(`${ equipmentOwnershipRelatedEquipmentUrl }/${ item.id }`, item.id, relatedItems )
            setCurrentItem(item);
            setBackupItem(item);
            onItemsListInfoButtonClick(currentFormState, setCurrentFormState, formHeader);
          }}><FontAwesomeIcon icon={faEye}/></button></td>
          <td><button className='btn btn-outline-danger' onClick={() => {
            setCurrentItem(item);
            checkRelatedItems(item.id);
          }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
        </tr>
      ))}
    </>
  );
};

export default TableRows;
