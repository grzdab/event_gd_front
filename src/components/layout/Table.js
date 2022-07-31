import React, { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from '../../js/helpers'
import { Pagination } from './Pagination'
import ButtonEdit from "../events/ButtonEdit";
import ButtonDelete from "../events/ButtonDelete";
import TableHead from "./TableHead";

export const Table = ({ columns, rows }) => {
    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
    const rowsPerPage = 10

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

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
                <TableHead
                    columns={columns}
                    setActivePage={setActivePage}
                    filters={filters}
                    setFilters={setFilters}
                    sort={sort}
                    setSort={setSort}
                />
                <tbody>
                {calculatedRows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {columns.map((column) => {
                                if (column.format) {
                                    return <td key={column.accessor}>{column.format(row[column.accessor])}</td>
                                }
                                return <td key={column.accessor}>{row[column.accessor]}</td>
                            })}
                            <td>
                                <ButtonEdit e={row} />
                            </td>
                            <td>
                                <ButtonDelete e={row}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

            {count > 0 ? (
                <Pagination
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
