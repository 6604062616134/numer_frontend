import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Bisection() {
  const [xL, setXL] = useState('');
  const [xR, setXR] = useState('');
  const [fx, setFx] = useState('');
  const [epsilon, setEpsilon] = useState('');
  const [outputData, setOutputData] = useState({
    error: [],
    iteration: [],
    xM: [],
    answer_xM: null,
    i_found: null
  });

  const handleSolve = async () => {
    let xLNum = parseFloat(xL);
    let xRNum = parseFloat(xR);
    let epsilonNum = parseFloat(epsilon);
    let i = 1;
    let xM = 0;
    let xm_new = 0;
    let error = 0;

    const evaluateFx = (x) => {
      try {
        const sanitizedFx = fx.replace(/\^/g, '**');
        return eval(sanitizedFx.replace(/x/g, `(${x})`));
      } catch (error) {
        console.error("Error evaluating the function:", error);
        return null;
      }
    };

    let iteration = [];
    let xMArray = [];
    let errorArray = [];

    let fxL = evaluateFx(xLNum);
    let fxR = evaluateFx(xRNum);

    // Check if the function has opposite signs at the boundaries
    if (fxL * fxR > 0) {
      setOutputData({
        iteration,
        xM: xMArray,
        error: errorArray,
        answer_xM: "No root found: The function does not cross the x-axis in the specified interval.",
        i_found: null
      });
      return; // Exit early if there's no root
    }

    do {
      xM = (xLNum + xRNum) / 2;
      let fxm = evaluateFx(xM);

      // Interval adjustment
      if (fxm * fxR < 0) {
        xLNum = xM;
      } else if (fxm * fxL < 0) {
        xRNum = xM;
      }

      error = Math.abs(xm_new - xM);
      xm_new = xM;

      iteration.push(i);
      xMArray.push(xM);
      errorArray.push(error);

      i++;
    } while (error > epsilonNum && i < 1000);

    // Update output data
    setOutputData({
      iteration,
      xM: xMArray,
      error: errorArray,
      answer_xM: xM,
      i_found: i - 1
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Bisection Method</h1>
        <p className="text-justify mt-2">
          The bisection method is a root-finding method that applies to any continuous function for which one knows two values with opposite signs.
        </p>

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
            </div>

            <div className="mt-6">
              <button className="btn btn-primary btn-block" onClick={handleSolve}>
                Solve
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
              <h2 className="text-xl font-semibold">Output</h2>
              <div className="text-lg">
                <p>Answer : {outputData.answer_xM ? outputData.answer_xM : 'No data'}</p>
              </div>
            <h2 className="text-xl font-semibold">Output Table</h2>

            <div className="h-80 overflow-x-auto rounded mt-2">
              <table className="table table-pin-rows rounded">
                <thead>
                  <tr>
                    <th className="bg-primary text-primary-content">Iteration</th>
                    <th className="bg-primary text-primary-content">X Value (xM)</th>
                    <th className="bg-primary text-primary-content">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {outputData.iteration.length > 0 ? (
                    outputData.iteration.map((iteration, index) => (
                      <tr key={index}>
                        <td>{iteration}</td>
                        <td>{outputData.xM[index]}</td>
                        <td>{outputData.error[index]}</td>
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
      </div>
    </div>
  );
}

export default Bisection;
