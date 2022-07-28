import React from 'react';
import ButtonEdit from '../events/ButtonEdit';
import ButtonDelete from '../events/ButtonDelete';


const TableBody = ({tableData, columns}) => {

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return tableData.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    return (
        <tbody>
        {/*{currentTableData.map(data => {*/}
            {tableData.map((data) => {
            return (
                <tr key={data.id}>
                    {columns.map(({accessor}) => {
                        const tData = data[accessor] ? data[accessor] : "——";
                        return <td key={accessor}>{tData}</td>;
                    })}
                    <td>
                        <ButtonEdit e={data} />
                    </td>
                    <td>
                        <ButtonDelete e={data}/>
                    </td>
                </tr>
            );
        })}
        </tbody>
    );
};
export default TableBody;