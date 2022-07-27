const TableBody = ({ tableData, columns }) => {
  return (
    <tbody>
    {tableData.map((data) => {
      return (
        <tr key={data.id}>
          {columns.map(({ accessor }) => {
            const tData = data[accessor] ? data[accessor] : "——";
            return <td key={accessor}>{tData}</td>;
          })}
          <td><button
            onClick={()=>alert(data.name)}
          >click</button></td>
        </tr>
      );
    })}
    </tbody>
  );
};

export default TableBody;