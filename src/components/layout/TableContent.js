import React, {useState} from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import {useSortableTable} from "../../js/useSortableTable";
// import Pagination from "../events/Pagination";

const TableContent = ({
                          caption,
                          data,
                          columns}) => {

    const [tableData, handleSorting] = useSortableTable(data, columns);

    return (
        <>
            <table className="table">
                <caption>{caption}</caption>
                <TableHead {...{ columns, handleSorting }} />
                <TableBody {...{columns, tableData}} />
            </table>
            {/*<Pagination*/}
            {/*    className="pagination-bar"*/}
            {/*    currentPage={currentPage}*/}
            {/*    totalCount={getCountItems}*/}
            {/*    pageSize={PageSize}*/}
            {/*    onPageChange={page => setCurrentPage(page)}*/}
            {/*/>*/}
        </>
    );
};

export default TableContent;