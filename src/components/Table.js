const Table = () => {
  return (
    <div className="h-80 overflow-x-auto rounded mt-2">
        <table className="table table-pin-rows rounded">
            {/* head */}
            <thead>
                <tr>
                <th className='bg-primary text-primary-content rounded-tl'>Iteration</th>
                <th className='bg-primary text-primary-content'>X Value</th>
                <th className='bg-primary text-primary-content rounded-tr'>Y Value</th>
                </tr>
            </thead>
            <tbody>
                {/* row 1 */}
                <tr>
                <th>1</th>
                <td>-</td>
                <td>-</td>
                </tr>
                {/* row 2 */}
                <tr>
                <th>2</th>
                <td>-</td>
                <td>-</td>
                </tr>
                {/* row 3 */}
                <tr>
                <th>3</th>
                <td>-</td>
                <td>-</td>
                </tr>
                <tr>
                <th>4</th>
                <td>-</td>
                <td>-</td>
                </tr>
                <tr>
                <th>5</th>
                <td>-</td>
                <td>-</td>
                </tr>
                <tr>
                <th>6</th>
                <td>-</td>
                <td>-</td>
                </tr>
                <tr>
                <th>7</th>
                <td>-</td>
                <td>-</td>
                </tr>
                <tr>
                <th>8</th>
                <td>-</td>
                <td>-</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
};

export default Table;
