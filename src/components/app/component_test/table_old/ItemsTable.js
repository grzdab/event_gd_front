import React from 'react';
import {Table} from "react-bootstrap";
import TableRows from "./TableRows";
import TableHead from "./TableHead";

const ItemsTable = ({ state, checkRelatedItems, getRelatedItemsByParentId, formHeader }) => {

  return (
    <>
      <div className="card-body">
        <Table id="datatablesSimple">
          <TableHead />
          <tbody>
            <TableRows
              state = { state }
              checkRelatedItems = { checkRelatedItems }
              formHeader = { formHeader }
            />
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ItemsTable;
