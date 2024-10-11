import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Onepoint() {
  const [xStart, setXstart] = useState('');
  const [fx, setFx] = useState('');
  const [epsilon, setEpsilon] = useState('');
  const [outputData, setOutputData] = useState({ iteration: [], y: [], answer_x: null, error: [] });
  const [arr, setArr] = useState([]);
  const [errors, setErrors] = useState([]);

  const parseFx = (fx) => {
    const regex = /x\^(\d+)\s*-\s*(\d+)/;
    const match = fx.match(regex);
    if (match) {
      const roots = parseFloat(match[1]); 
      const num = parseFloat(match[2]); 
      return { roots, num };
    }
    return null;
  };

  const handleSolve = async () => {
    let x = parseFloat(xStart);
    let epsilonValue = parseFloat(epsilon);

    if (isNaN(x) || isNaN(epsilonValue) || !fx) {
      alert("Please input valid numbers for xStart, epsilon, and a valid function.");
      return;
    }

    const parsedFx = parseFx(fx); 
    if (!parsedFx) {
      alert("Invalid function format. Please input a function in the form 'x^n - num'.");
      return;
    }

    const { roots, num } = parsedFx; 

    let y = 0;
    let error = 0;
    let i = 1;
    const newYValues = [];
    const newIteration = [];
    const newErrors = [];

    do {
      try {
        y = (1 / 2) * ((num / Math.pow(x, roots - 1)) + x);

        if (!isFinite(y)) {
          alert("Error: The result is infinity. This might be due to division by zero or overflow.");
          return;
        }

        if (isNaN(y)) {
          alert("Error: The result is NaN (Not a Number). Please check your input function.");
          return;
        }

      } catch (err) {
        alert("Error in function evaluation");
        return;
      }

      error = Math.abs(y - x);
      newYValues.push(y);
      newIteration.push(i);
      newErrors.push(error);

      x = y;
      i++;

      if (i > 100) {
        alert("Iteration limit reached.");
        break;
      }

    } while (error > epsilonValue);

    setOutputData({ iteration: newIteration, y: newYValues, answer_x: y, error: newErrors });
    setArr(newYValues);
    setErrors(newErrors);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">One-point iteration</h1>
        <p className="text-justify mt-2">
          The one-point iteration method is a root-finding algorithm that uses the Newton-Raphson method to find the root of a function. The algorithm starts with an initial guess x0</p>
        {/* Input & Table Section */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className='flex flex-col w-full'>
            <h2 className="text-xl font-semibold">Input</h2>

            <div className="flex gap-4 w-full">
              <div className="mt-2">
                <label className="block">Function</label>
                <label className="block">(use ^ to input powers)</label>
                <input
                  type="text"
                  placeholder='f(x)'
                  className="input input-bordered w-full input-primary mt-2"
                  value={fx}
                  onChange={(e) => setFx(e.target.value)}
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

              <div className="mt-2">
                <label className="block">x Start</label>
                <input
                  type="text"
                  placeholder='x0'
                  className="input input-bordered w-full input-primary mt-2"
                  value={xStart}
                  onChange={(e) => setXstart(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <button className="btn btn-primary btn-block" onClick={handleSolve}>Solve</button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-semibold">Output</h2>

            <div className="text-lg">
              <p>Answer : {outputData.answer_x ? outputData.answer_x.toFixed(6) : 'No data'}</p>
              <p>Iteration : {outputData.iteration ? outputData.iteration.length : 'No data'}</p>
            </div>
            <h2 className="text-xl font-semibold">Output Table</h2>
            <table className="table table-pin-rows rounded">
              <thead>
                <tr>
                  <th className="bg-primary text-primary-content">Iteration</th>
                  <th className="bg-primary text-primary-content">Y Value</th>
                  <th className="bg-primary text-primary-content">Error</th>
                </tr>
              </thead>
              <tbody>
                {arr.length > 0 ? (
                  arr
                    .slice(-20) // แสดงเฉพาะ 20 แถวสุดท้าย
                    .map((yValue, index) => (
                      <tr key={index}>
                        <td>{outputData.iteration.slice(-20)[index]}</td>
                        <td>{yValue.toFixed(6)}</td>
                        <td>{errors.slice(-20)[index] ? errors.slice(-20)[index].toFixed(6) : 'No data'}</td>
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

        {/* Graph Section */}
      </div>
    </div>
  );
}

export default Onepoint;
