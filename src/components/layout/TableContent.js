import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import {useSortableTable} from "../../js/useSortableTable";
import Pagination from "@mui/material/Pagination";
import {Stack} from "@mui/material";
import {getItems} from "../helpers/ComponentHelper";
// import usePagination from "../events/Pagination";
///
//ASYNCHONICZNOsc!!
///
const TableContent = ({
                          caption,
                          data,
                          columns,
                          countItems,
                          currentPage,
                          setCurrentPage,
                          setItems,
                          setLoading
                      }) => {

    console.log("Data przed stanem");
    console.log(data);

    const [tableData, handleSorting] = useSortableTable(data, columns);


    const count = Math.ceil(countItems / 10);
    // const _DATA = usePagination(tableData, 10, currentPage)
    const handleChange = async (e, p) => {

        setCurrentPage(currentPage);

        getItems(`http://localhost:8081/admin/language/languagePage=${p}`, handleSorting)
            .then(() => setLoading(false))
            .catch(console.error);
        window.location.reload(false);
    };


    return (
        <>
            <table className="table">
                <caption>{caption}</caption>
                <TableHead {...{ columns, handleSorting }} />
                <TableBody {...{columns, tableData}} />
            </table>
        </>
    );
};

export default TableContent;