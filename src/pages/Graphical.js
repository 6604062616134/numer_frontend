import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

function Graphical() {
  // State variables for inputs
  const [xStart, setXStart] = useState('');
  const [xEnd, setXEnd] = useState('');
  const [func, setFunc] = useState('');
  const [step, setStep] = useState('');
  
  // State for output data from the backend
  const [outputData, setOutputData] = useState([]);

  const columns = ['Iteration', 'X Value', 'Y Value', 'Error'];

  // Function to handle the solve button click
  const handleSolve = async () => {
    const data = {
      xStart: parseFloat(xStart),
      xEnd: parseFloat(xEnd),
      function: func,
      step: parseFloat(step),
    };

    //check data send to API
    console.log("Sending data to API:", data);

    try {
      const response = await fetch('http://localhost:8000/graphical', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      
      // Set output data to state
      setOutputData(result); // Assuming result is an array of objects
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Graphical Method</h1>
        <p className="text-justify mt-2">
          The graphical method is a simple method used to solve linear programming problems. It is used to represent the feasible region graphically and find the optimal solution.
        </p>

        {/*input & table section*/}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className='flex flex-col w-full'>
            <h2 className="text-xl font-semibold">Input</h2>

            <div className="flex gap-4">
              <div className="mt-2 w-full">
                <label className="block">xStart</label>
                <input
                  type="text"
                  placeholder='0'
                  className="input input-bordered w-full input-primary mt-2"
                  value={xStart}
                  onChange={(e) => setXStart(e.target.value)}
                />
              </div>
              <div className="mt-2 w-full">
                <label className="block">xEnd</label>
                <input
                  type="text"
                  placeholder='10'
                  className="input input-bordered w-full input-primary mt-2"
                  value={xEnd}
                  onChange={(e) => setXEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block">Function</label>
              <input
                type="text"
                placeholder='f(x)'
                className="input input-bordered w-full input-primary mt-2"
                value={func}
                onChange={(e) => setFunc(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label className="block">Step</label>
              <input
                type="text"
                placeholder='0.00001'
                className="input input-bordered w-full input-primary mt-2"
                value={step}
                onChange={(e) => setStep(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button className="btn btn-primary btn-block" onClick={handleSolve}>
                Solve
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-semibold">Output Table</h2>

            {/* Pass the output data and column names to the Table component */}
            <Table columns={columns} data={outputData} />
          </div>
        </div>

        {/*graph section*/}
        
      </div>
    </div>
  );
}

export default Graphical;
