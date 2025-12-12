import "./dataTable.css";

const DataTable = ({ columns, data, RowComponent }) => {
  console.log(data);
  
  return (
    <div className="containerTable">
      <table className="table">
        <thead className="border-b text-sm">
          <tr className="">
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          { !data && (<p>Hola mundo</p> )
           }
          {data &&
            data.map((row, i) => (
              <RowComponent key={i} row={row}></RowComponent>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default DataTable;
