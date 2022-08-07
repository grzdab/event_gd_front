import React, { useState, useMemo } from 'react'
import { filterRows } from './DJtableHelpers'
import { DJPagination } from './DJPagination'
import DJTableHead from "./DJTableHead";
import DJTableBody from "./DJTableBody";

export const DJTable = ({ columns, rows }) => {
    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
    const rowsPerPage = 10

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const count = filteredRows.length
    const totalPages = Math.ceil(count / rowsPerPage)

    const clearAll = () => {
        setSort({ order: 'asc', orderBy: 'id' })
        setActivePage(1)
        setFilters({})
    }

    return (
        <>
            <table>
                <DJTableHead
                    columns={columns}
                    setActivePage={setActivePage}
                    filters={filters}
                    setFilters={setFilters}
                    sort={sort}
                    setSort={setSort}
                />
                <DJTableBody
                    columns={columns}
                    sort={sort}
                    activePage={activePage}
                    filteredRows={filteredRows}
                    rowsPerPage={rowsPerPage}
                    />
            </table>

            {count > 0 ? (
                <DJPagination
                    activePage={activePage}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    setActivePage={setActivePage}
                />
            ) : (
                <p>No data found</p>
            )}

            <div>
                <p>
                    <button onClick={clearAll}>Clear all</button>
                </p>
            </div>
        </>
    )
}
