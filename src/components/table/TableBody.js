import React, {useMemo} from 'react';
import { paginateRows, sortRows } from "./tableHelpers";
import {onItemsListInfoButtonClick} from "../../helpers/ComponentHelper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrashAlt, faSquare} from "@fortawesome/free-solid-svg-icons";
import useCrud from "../../hooks/useCrud";


const TableBody = ({
                     columns,
                     sort,
                     activePage,
                     filteredRows,
                     rowsPerPage,
                     state,
                     checkRelatedItems,
                     formHeader,
                     relatedItemsUrl,
                     getCompleteItem
                   }) => {

  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)
  const { getRelatedChildrenByParentId } = useCrud();
  const setCurrentItem = state.setCurrentItem;
  const setBackupItem = state.setBackupItem;
  const currentFormState = state.currentFormState;
  const setCurrentFormState = state.setCurrentFormState;
  const relatedItems = state.setRelatedItems;


  return (
    <tbody>
    {calculatedRows.map((item) => {
      return (
        <tr key={item.id}>
          {columns.map((column) => {
            if (column.visible !== false) {
              if (column.accessor === "editBtn") {
                return (
                  <td>
                    <button className='btn btn-outline-info' onClick={async () => {
                      relatedItemsUrl && getRelatedChildrenByParentId(`${relatedItemsUrl}/${item.id}`, item.id, relatedItems);
                      if (getCompleteItem) {
                        const completeItem = await getCompleteItem(item.id);
                        setCurrentItem(completeItem);
                        setBackupItem(completeItem);
                      } else {
                        setCurrentItem(item);
                        setBackupItem(item);
                      }
                      onItemsListInfoButtonClick(currentFormState, setCurrentFormState, formHeader);
                    }}><FontAwesomeIcon icon={faEye}/></button>
                  </td>
                )
              } else if (column.accessor === "deleteBtn") {
                return (
                  <td>
                    <button className='btn btn-outline-danger' onClick={() => {
                      setCurrentItem(item);
                      checkRelatedItems(item.id);
                    }}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
                )
              } else if (column.format) {
                return <td key={column.accessor}>{column.format(item[column.accessor])}</td>
              } else if (column.type === "color") {
                return <td><FontAwesomeIcon style={{color: item.color}} icon={faSquare}/></td>
              }
              return <td key={column.accessor}>{item[column.accessor]}</td>
            }
          })}
        </tr>
      )
    })}
    </tbody>
  );
};
export default TableBody;

