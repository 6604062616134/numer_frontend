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
          {data && data.answer_y && data.answer_y.length > 0 ? (
            (() => {
              const rows = [];
              for (let i = 0; i < data.answer_y.length; i++) {
                rows.push(
                  <tr key={i}>
                    <td>{data.answer_x}</td>
                    <td>{data.answer_y[i]}</td>
                    <td>{data.iteration[i]}</td>
                    <td>{data.iterationFound1}</td>
                  </tr>
                );
              }
              return rows;
            })()
          ) : (
            <tr>
              <td colSpan={4} className="text-center">No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
