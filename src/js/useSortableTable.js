import { useState } from "react";

function getDefaultSorting(defaultTableData, columns) {
    console.log("defaultTableData");
    console.log(defaultTableData);

    console.log("columns");
    console.log(columns);
    const sorted = [...defaultTableData].sort((a, b) => {
        const filterColumn = columns.filter((column) => column.sortbyOrder);

        // Merge all array objects into single object and extract accessor and sortbyOrder keys
        let { accessor = "id", sortbyOrder = "asc" } = Object.assign(
            {},
            ...filterColumn
        );

        if (a[accessor] === null) return 1;
        if (b[accessor] === null) return -1;
        if (a[accessor] === null && b[accessor] === null) return 0;

        const ascending = a[accessor]
            .toString()
            .localeCompare(b[accessor].toString(), "en", {
                numeric: true,
            });

        return sortbyOrder === "asc" ? ascending : -ascending;
    });
    return sorted;
}

export const useSortableTable = (data, columns) => {
    const [tableData, setTableData] = useState(getDefaultSorting(data, columns));

    console.log("data w useSortable");
    console.log(data);
    console.log("columns w useSortable");
    console.log(columns);
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            console.log("sortField");
            console.log(sortField);
            console.log("sortOrder");
            console.log(sortOrder);
            if (sortOrder === undefined) {
                sortOrder = "asc";
            }
            console.log("sortOrder updated");
            console.log(sortOrder);
            const sorted = [...data].sort((a, b) => {
                console.log("a");
                console.log(a);

                console.log("b");
                console.log(b);
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
    };

    return [tableData, handleSorting];
};