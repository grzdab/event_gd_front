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

        // const response = await fetch(`http://localhost:8081/admin/language/languagePage=${p}`);
        // const dupa = await response.json();
        // switch(response.status) {
        //     case 401:
        //         // TODO Unauthenticated
        //         break;
        //     case 403:
        //         // TODO Forbidden
        //         break;
        //     case 404:
        //         // TODO Not found
        //         break;
        //     default:
        //     // TODO Other errors
        // }
        // console.log("dupa");
        // console.log(dupa);
        // console.log("data");
        // console.log(data);
        //
        // data = dupa;
        // console.log("table data");
        // console.log(tableData);
        // // handleSorting(dupa, columns);
        // console.log("handleSorting");
        // // console.log(handleSorting);
        // // const [tableData, handleSorting] = useSortableTable(dupa, columns);
        //
        // handleSorting("id", "desc");
        //
        //
        //
        //
        //
        //
        // // console.log(e);
        // console.log("datajump");
        // // (currentPage) => setCurrentPage(currentPage)
        // // console.log(_DATA)
        // // _DATA.jump(p);
        // // console.log(_DATA)
        window.location.reload(false);
    };


    return (
        <>
            <table className="table">
                <caption>{caption}</caption>
                <TableHead {...{ columns, handleSorting }} />
                <TableBody {...{columns, tableData}} />
            </table>
            <Stack spacing={2}>
            <Pagination
                count={count}
                variant="outlined"
                color="primary"
                size="small"
                totalItems={tableData.length}
                // itemPerPage={10}
                // onChange={}
                // onChange={getPaginationItems}
                boundaryCount={1}
                showFirstButton
                showLastButton
                defaultPage={1}
                // page={page}
                onChange={handleChange}
            />
            </Stack>
        </>
    );
};

export default TableContent;