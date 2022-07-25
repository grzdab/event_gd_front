import React, { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import {useEffect, useMemo} from "react";
import {getItems} from "../helpers/ComponentHelper";

const TableContent = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    const paginationSize = useMemo(() => {
        useEffect(() => {
            getItems(`http://localhost:8081/admin/language`, setTableData)
                .then(() => setLoading(false))
                .catch(console.error);
        }, []);
    });

    const columns = [
        { label: "Id", accessor: "id" },
        { label: "Language", accessor: "propertyName" },
    ];

    return (
        <>
            <table className="table">
                <caption>
                    Developers currently enrolled in this course, column headers are sortable.
                </caption>
                <TableHead columns={columns} />
                <TableBody columns={columns} tableData={tableData} />
            </table>
        </>
    );
};

export default TableContent;