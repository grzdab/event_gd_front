import React, {useState} from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import {useSortableTable} from "../../js/useSortableTable";
import Pagination from "../events/Pagination";

let PageSize = 10;

const TableContent = ({
                          caption,
                          data,
                          columns,
                          getCountItems,
                          currentPage,
                          setCurrentPage }) => {

    const [tableData, handleSorting] = useSortableTable(data, columns);

    return (
        <>
            <table className="table">
                <caption>{caption}</caption>
                <TableHead {...{ columns, handleSorting }} />
                <TableBody {...{columns, tableData, PageSize, currentPage}} />
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={getCountItems}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
};

export default TableContent;