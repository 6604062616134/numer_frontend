import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function FalsePosition() {
  const [xL, setXL] = useState('');
  const [xR, setXR] = useState('');
  const [fx, setFx] = useState('');
  const [epsilon, setEpsilon] = useState('');
  const [outputData, setOutputData] = useState({
    error: [],
    iteration: [],
    x1: [],
    answer_x1: null,
    i_found: null
  });

  const handleSolve = async () => {
    let xLNum = parseFloat(xL);
    let xRNum = parseFloat(xR);
    let epsilonNum = parseFloat(epsilon);
    let i = 1;
    let x1 = 0;
    let x1_new = 0;
    let error = 0;

    const evaluateFx = (x) => {
      try {
        // Replace ^ with **
        const sanitizedFx = fx.replace(/\^/g, '**');
        return eval(sanitizedFx.replace(/x/g, `(${x})`));
      } catch (error) {
        console.error("Error evaluating the function:", error);
        return null;
      }
    };

    let fxL = evaluateFx(xLNum);
    let fxR = evaluateFx(xRNum);

    // Check if there is a sign change
    if (fxL * fxR > 0) {
      setOutputData({
        error: [],
        iteration: [],
        x1: [],
        answer_x1: 'No root found in the given interval. Please choose different xL and xR.',
        i_found: null
      });
      return; // Exit the function if no sign change
    }

    let iteration = [];
    let x1Array = [];
    let errorArray = [];

    do {
      x1 = ((xLNum * fxR) - (xRNum * fxL)) / (fxR - fxL);
      let fx1 = evaluateFx(x1);

      if (fx1 * fxR < 0) {
        xLNum = x1;
        fxL = fx1; // Update fxL
      } else if (fx1 * fxL < 0) {
        xRNum = x1;
        fxR = fx1; // Update fxR  
      }

      error = Math.abs(x1_new - x1);
      x1_new = x1;

      iteration.push(i);
      x1Array.push(x1);
      errorArray.push(error);

      i++;
    } while (error > epsilonNum && i < 1000);

    // Update output data
    setOutputData({
      iteration,
      x1: x1Array,
      error: errorArray,
      answer_x1: x1,
      i_found: i - 1
    });
  };

  // Function to calculate y-values for plotting the graph
  const calculateY = (x, fx) => {
    const sanitizedFx = fx.replace(/\^/g, '**');
    try {
      return eval(sanitizedFx.replace(/x/g, `(${x})`));
    } catch (error) {
      console.error("Error calculating y values:", error);
      return 0;
    }
  };

  const xRange = 100;
  const xValues = Array.from({ length: 201 }, (_, i) => i - xRange);
  const yValues = xValues.map(x => calculateY(x, fx));

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
      <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
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
                <div className="mt-2 w-full">
                  <label className="block">Function</label>
                  <input
                    type="text"
                    placeholder='f(x) (use ^ to input powers)'
                    className="input input-bordered w-full input-primary mt-2"
                    value={fx}
                    onChange={(e) => setFx(e.target.value)}
                  />
                </div>
                <div className="mt-2 w-full">
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
              <h2 className="text-xl font-semibold">Output</h2>
              <div className="text-lg">
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
                    {outputData && outputData.iteration.length > 0 ? (
                      outputData.iteration.map((iteration, index) => (
                        <tr key={index}>
                          <td>{iteration}</td>
                          <td>{outputData.x1[index]}</td>
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

          {/* Graph section */}
          <div className='w-full flex justify-center bg-base-100 mt-8'>
            <Plot
              data={[
                {
                  x: xValues,
                  y: yValues,
                  type: 'scatter',
                  mode: 'lines',
                  marker: { color: 'black' },
                },
              ]}
              layout={{
                width: '100%',
                height: 400,
                title: fx ? `Graph of ${fx}` : 'Graph',
                paper_bgcolor: '#ffefcc',
                plot_bgcolor: '#ffefcc',
                xaxis: {
                  range: [-100, 100],
                },
                yaxis: {
                  range: [-100, 100],
                },
                margin: {
                  l: 40,
                  r: 40,
                  t: 40,
                  b: 40,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FalsePosition;
