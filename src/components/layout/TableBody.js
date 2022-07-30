import React from 'react';
import ButtonEdit from '../events/ButtonEdit';
import ButtonDelete from '../events/ButtonDelete';


const TableBody = ({tableData, columns}) => {

    console.log("tableData w tableBody");
    console.log(tableData);
    console.log("columns w tableBody");
    console.log(columns);

    return (
        <tbody>
            {tableData.map((data) => {
            return (
                <tr key={data.id}>
                    {columns.map(({accessor}) => {
                        console.log("accessor");
                        console.log(accessor);
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