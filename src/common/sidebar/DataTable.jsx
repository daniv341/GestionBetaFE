import React from "react";

function DataTable({ columns, data, RowComponent }) {
  return (
    <table>
      <thead>
        <tr className="">
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <RowComponent key={i} row={row} />
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
