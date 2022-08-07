import React, { useState, useMemo } from 'react';
import { filterRows } from './tableHelpers';
import { Pagination } from './Pagination';
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export const Table = ({ columns, state, checkRelatedItems, formHeader }) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({ });
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  const rowsPerPage = 10;
  const rows = state.itemsList;
  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters]);
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' });
    setActivePage(1);
    setFilters({ });
  }

  return (
    <>
      <table className="table">
        <TableHead
          columns = { columns }
          setActivePage = { setActivePage }
          filters = { filters }
          setFilters = { setFilters }
          sort = { sort }
          setSort = { setSort }
        />
        <TableBody
          columns = { columns }
          sort = { sort }
          activePage = { activePage }
          filteredRows = { filteredRows }
          rowsPerPage = { rowsPerPage }
          state = { state }
          formHeader = { formHeader }
        />
      </table>

      { count > 0 ? (
        <Pagination
          activePage = { activePage }
          count = { count }
          rowsPerPage = { rowsPerPage }
          totalPages = { totalPages }
          setActivePage = { setActivePage }
        />
      ) : (
        <p>No data found</p>
      ) }

      <div>
        <p>
          <button onClick = { clearAll }>Reset all filters</button>
        </p>
      </div>
    </>
  )
}

