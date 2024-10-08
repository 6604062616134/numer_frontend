const Table = ({ columns, data }) => {
  return (
    <div className="h-80 overflow-x-auto rounded mt-2">
      <table className="table table-pin-rows rounded">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="bg-primary text-primary-content">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.iteration && data.iteration.length > 0 ? (
            data.iteration.map((iteration, i) => (
              <tr key={i}>
                <td>{iteration}</td>
                <td>{data.xM[i]}</td>
                <td>{data.error[i]}</td>
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
