import React, { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../../js/useSortableTable";

const TableContent = ({ caption, data, columns }) => {
    const [tableData, handleSorting] = useSortableTable(data, columns);

    return (
        <>
            <table className="table">
                <caption>{caption}</caption>
                <TableHead {...{ columns, handleSorting }} />
                <TableBody {...{ columns, tableData }} />
            </table>
        </>
    );
};

export default TableContent;