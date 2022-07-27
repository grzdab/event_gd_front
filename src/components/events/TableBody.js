import React from 'react';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';

const TableBody = ({tableData, columns}) => {

    return (
        <tbody>
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