import React from 'react';
import {Table} from "react-bootstrap";
import TableRows from "./TableRows";
import TableHead from "./TableHead";

const ItemsTable = ({ itemsList, setCurrentItem, setBackupItem, currentFormState, setCurrentFormState, checkRelatedEquipment, getRelatedEquipmentByOwnershipId }) => {
  return (
    <>
      <div className="card-body">
        <Table id="datatablesSimple">
          <TableHead />
          <tbody>
            <TableRows itemsList={itemsList}
                       setCurrentItem={setCurrentItem}
                       setBackupItem={setBackupItem}
                       currentFormState={currentFormState}
                       setCurrentFormState={setCurrentFormState}
                       checkRelatedEquipment={checkRelatedEquipment}
                       getRelatedEquipmentByOwnershipId={getRelatedEquipmentByOwnershipId} />
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ItemsTable;
