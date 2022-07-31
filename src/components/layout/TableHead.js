import React, {useState} from 'react';
//
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
        <thead>
        <tr>
            {columns.map((column) => {
                const sortIcon = () => {
                    if (column.accessor === sort.orderBy) {
                        if (sort.order === 'asc') {
                            return '⬆️'
                        }
                        return '⬇️'
                    } else {
                        return '️↕️'
                    }
                }
                return (
                    <th key={column.accessor}>
                        <span>{column.label}</span>
                        <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                    </th>
                )
            })}
        </tr>
        <tr>
            {columns.map((column) => {
                return (
                    <th>
                        <input
                            key={`${column.accessor}-search`}
                            type="search"
                            placeholder={`Search ${column.label}`}
                            value={filters[column.accessor]}
                            onChange={(event) => handleSearch(event.target.value, column.accessor)}
                        />
                    </th>
                )
            })}
        </tr>
        </thead>
    );
};

export default TableHead;