import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

function FalsePosition() {
  const [xL, setXL] = useState('');
  const [xR, setXR] = useState('');
  const [roots, setRoots] = useState('');
  const [num, setNum] = useState('');
  const [epsilon, setEpsilon] = useState('0.00001');
  const [outputData, setOutputData] = useState(null); // For storing the output data

  // Function to handle the API request
  const handleSolve = async () => {
    const data = {
      xL: parseFloat(xL),
      xR: parseFloat(xR),
      roots: parseInt(roots),
      num: parseFloat(num),
      epsilon: parseFloat(epsilon),
      mode: "False-position", // Specify the mode
    };

    try {
      const response = await fetch('http://localhost:8000/bisecton-falseposition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setOutputData(result); // Set the result to state
      console.log("Result:", result); // For debugging
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">False-Position Method</h1>
        <p className="text-justify mt-2">
          The false position method is a root-finding algorithm that uses a succession of roots of secant lines combined with the bisection method to approximate a root of a function f.
        </p>

        {/* Input & table section */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className='flex flex-col w-full'>
            <h2 className="text-xl font-semibold">Input</h2>

            <div className="flex gap-4">
              <div className="mt-2 w-full">
                <label className="block">xL</label>
                <input
                  type="text"
                  placeholder='0'
                  className="input input-bordered w-full input-primary mt-2"
                  value={xL}
                  onChange={(e) => setXL(e.target.value)}
                />
              </div>
              <div className="mt-2 w-full">
                <label className="block">xR</label>
                <input
                  type="text"
                  placeholder='10'
                  className="input input-bordered w-full input-primary mt-2"
                  value={xR}
                  onChange={(e) => setXR(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="mt-2">
                <label className="block">Roots</label>
                <input
                  type="text"
                  placeholder='roots'
                  className="input input-bordered w-full input-primary mt-2"
                  value={roots}
                  onChange={(e) => setRoots(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <label className="block">Number</label>
                <input
                  type="text"
                  placeholder='number'
                  className="input input-bordered w-full input-primary mt-2"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="block">Epsilon</label>
                <input
                  type="text"
                  placeholder='0.00001'
                  className="input input-bordered w-full input-primary mt-2"
                  value={epsilon}
                  onChange={(e) => setEpsilon(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <button className="btn btn-primary btn-block" onClick={handleSolve}>
                Solve
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">

            {/* Output x value */}
            <div className="text-lg">
              <h2 className="text-xl font-semibold">Output</h2>
              <p>Answer : {outputData && outputData.answer_x1 ? outputData.answer_x1 : 'No data'}</p>
            </div>
            <h2 className="text-xl font-semibold">Output Table</h2>

            <div className="h-80 overflow-x-auto rounded mt-2">
              <table className="table table-pin-rows rounded">
                <thead>
                  <tr>
                    <th className="bg-primary text-primary-content">Iteration</th>
                    <th className="bg-primary text-primary-content">X Value (x1)</th>
                    <th className="bg-primary text-primary-content">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {outputData && outputData.iteration2 && outputData.iteration2.length > 0 ? (
                    outputData.iteration2.map((iteration, index) => (
                      <tr key={index}>
                        <td>{iteration}</td>
                        <td>{outputData.x1[index]}</td>
                        <td>{outputData.error2[index]}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">No data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Graph section */}
      </div>
    </div>
  );
}

export default FalsePosition;
