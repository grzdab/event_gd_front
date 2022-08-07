import React,  {useMemo} from 'react';
import ButtonEdit from '../app/events_test/ButtonEdit';
import ButtonDelete from '../app/events_test/ButtonDelete';
import { paginateRows, sortRows } from "./DJtableHelpers";

const DJTableBody = ({
                    columns,
                    sort,
                    activePage,
                    filteredRows,
                    rowsPerPage
                }) => {

    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

    return (
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
    );
};
export default DJTableBody;