const Table = ({ columns, data }) => {
  return (
    <div className="h-80 overflow-x-auto rounded mt-2">
      <table className="table table-pin-rows rounded">
        {/* head */}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="bg-primary text-primary-content">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
