import React from 'react';
import ButtonEdit from './ButtonEdit';

const TableBody = ({tableData, columns}) => {

    return (
        <tbody>
        {tableData.map((data) => {
            return (
                <tr key={data.id}>
                    <td>
                        <ButtonEdit e={data} />
                    </td>
                    {columns.map(({accessor}) => {
                        const tData = data[accessor] ? data[accessor] : "——";
                        return <td key={accessor}>{tData}</td>;
                    })}
                </tr>
            );
        })}
        </tbody>
    );
};

export default TableBody;