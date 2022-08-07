import React from 'react';
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const TableHead = ({
                     columns,
                     setActivePage,
                     filters,
                     setFilters,
                     sort,
                     setSort
                   }) => {


  const handleSort = (accessor) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }
  const handleSearch = (value, accessor) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]
        return updatedFilters
      })
    }
  }

  return (
    <thead style={{backgroundColor: "#D9DFF0"}}>
    <tr className = "table-settings-header">
      {columns.map((column) => {
        const sortIcon = () => {
          if (column.accessor === sort.orderBy) {
            if (sort.order === 'asc') {
              return <FontAwesomeIcon icon={ faSortUp }/>
            }
            return <FontAwesomeIcon icon={ faSortDown }/>
          } else {
            return <FontAwesomeIcon icon={ faSort }/>
          }
        }

        return (
          <th key={column.accessor}>
            <span>{column.label}</span>
            {column.sortable && <button className = "sort-button" onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>}
          </th>
        )
      })}
    </tr>
    <tr className = "table-settings-header">
      {columns.map((column) => {
        return (
          <th>
            {column.searchable &&
              <input
                key={`${column.accessor}-search`}
                type="search"
                placeholder={`Search ${column.label}`}
                value={filters[column.accessor]}
                onChange={(event) => handleSearch(event.target.value, column.accessor)}
              />}
          </th>
        )
      })}
    </tr>
    </thead>
  );
};

export default TableHead;

