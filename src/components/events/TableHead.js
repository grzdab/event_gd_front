import React, {useEffect, useState} from 'react';

const TableHead = ({ columns, handleSorting }) => {
    const [sortField, setSortField] = useState("propertyName");
    const [order, setOrder] = useState("asc");

// useEffect(()=> {
//      handleSortingChange(sortField);
// },[]);

    const handleSortingChange = (accessor) => {
        // console.log(`Accesor ${sortField}`);
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
        // console.log(`Accesor ${sortField}`);
    };

    return (
        <thead>
        <tr>
            {columns.map(({ label, accessor, sortable }) => {
                const cl = sortable
                    ? sortField === accessor && order === "asc"
                        ? "up"
                        : sortField === accessor && order === "desc"
                            ? "down"
                            : "default"
                    : "";
                return (
                    <th
                        key={accessor}
                        onClick={sortable ? () => handleSortingChange(accessor) : null}
                        className={cl}
                    >
                        {label}
                    </th>
                );
            })}
        </tr>
        </thead>
    );
};

export default TableHead;