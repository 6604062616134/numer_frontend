import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function GaussSeidel() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [metrixSize, setMetrixSize] = useState(3);
    const [arrayA, setArrayA] = useState(Array(metrixSize).fill().map(() => Array(metrixSize).fill('')));
    const [arrayB, setArrayB] = useState(Array(metrixSize).fill(''));
    const [result, setResult] = useState([]);
    const [plotData, setPlotData] = useState([]);

    const [x, setX] = useState(Array(metrixSize).fill(0));  // Initial guess
    const tolerance = 1e-6;
    const maxIterations = 1000;
    const [outputData, setOutputData] = useState({ iteration: [], xM: [], error: [] });

    useEffect(() => {
        console.log("Result updated:", result);
        updatePlotData();
    }, [result]);


    const calculateGaussSeidel = () => {
        const rows = arrayA.length;
        const cols = arrayA[0].length;

        // Validate array sizes
        if (arrayA.length !== arrayB.length || arrayA.some(row => row.length !== cols)) {
            alert("Array size does not match matrix dimensions");
            return;
        }

        const matrixA = arrayA.map(row => row.map(Number)); // Convert inputs to numbers
        const matrixB = arrayB.map(Number); // Convert B array to numbers

        let iteration = 0;
        let error = tolerance + 1;
        let xNew = [...x];  // Deep copy of the initial guess
        let newOutputData = { iteration: [], xM: [], error: [] }; // Create new output data structure

        while (iteration < maxIterations && error > tolerance) {
            let previousX = [...xNew];  // Backup previous values for error calculation

            for (let i = 0; i < rows; i++) {
                let sum = 0;
                for (let j = 0; j < cols; j++) {
                    if (j !== i) {
                        sum += matrixA[i][j] * xNew[j];  // Use updated values immediately
                    }
                }
                xNew[i] = (matrixB[i] - sum) / matrixA[i][i];
            }

            error = Math.max(...xNew.map((value, index) => Math.abs(value - previousX[index])));

            // Add data to output structure
            newOutputData.iteration.push(iteration + 1); // Store current iteration number
            newOutputData.xM.push([...xNew]); // Store current x values
            newOutputData.error.push(error); // Store current error value

            iteration++;
        }

        setResult(xNew); // Update the state with the result
        setOutputData(newOutputData); // Update the output table data
    };

    const increaseMetrixSize = () => {
        if (metrixSize < 5) {
            setMetrixSize(metrixSize + 1);
            setArrayA(Array(metrixSize + 1).fill().map(() => Array(metrixSize + 1).fill('')));
            setArrayB(Array(metrixSize + 1).fill(''));
            setX(Array(metrixSize + 1).fill(0));
        }
    };

    const decreaseMetrixSize = () => {
        if (metrixSize > 2) {
            setMetrixSize(metrixSize - 1);
            setArrayA(Array(metrixSize - 1).fill().map(() => Array(metrixSize - 1).fill('')));
            setArrayB(Array(metrixSize - 1).fill(''));
            setX(Array(metrixSize - 1).fill(0));
        }
    };

    const handleArrayAChange = (e, i, j) => {
        const value = e.target.value;
        const newArrayA = [...arrayA];
        newArrayA[i][j] = value;
        setArrayA(newArrayA);
    };

    const handleArrayBChange = (e, i) => {
        const value = e.target.value;
        const newArrayB = [...arrayB];
        newArrayB[i] = value;
        setArrayB(newArrayB);
    };

    const updatePlotData = () => {
        // Prepare data for the plot based on the equations
        if (result.length >= 2) {
            const xValues = Array.from({ length: 100 }, (_, i) => i - 50); // X values from -50 to 49
            const yValues1 = xValues.map(x => (result[0] * x + arrayB[0]) / arrayA[0][1]);
            const yValues2 = xValues.map(x => (result[1] * x + arrayB[1]) / arrayA[1][1]);

            setPlotData([
                {
                    x: xValues,
                    y: yValues1,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Equation 1',
                },
                {
                    x: xValues,
                    y: yValues2,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Equation 2',
                },
            ]);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Gauss-Seidel iteration</h1>
                    <p className="text-justify mt-2">
                        In numerical linear algebra, the Gauss–Seidel method, also known as the Liebmann method or the method of successive displacement, is an iterative method used to solve a linear system of equations. It is named after the German mathematicians Carl Friedrich Gauss and Philipp Ludwig von Seidel, and is similar to the Jacobi method. Though it can be applied to any matrix with non-zero elements on the diagonals, convergence is only guaranteed if the matrix is either diagonally dominant, or symmetric and positive definite. It is a refinement of the Jacobi method and is often used to solve systems of linear equations.
                    </p>

                    <div className="flex flex-col lg:flex-row mt-6 gap-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-xl font-semibold">Input</h2>

                            <div className="">
                                <div className="mt-2 flex flex-row gap-4 justify-center">
                                    <div>
                                        <label className="block">Array A</label>
                                        {
                                            Array.from({ length: metrixSize }).map((_, i) => (
                                                <div key={i} className="flex gap-1">
                                                    {
                                                        Array.from({ length: metrixSize }).map((_, j) => (
                                                            <input
                                                                key={j}
                                                                type="text"
                                                                placeholder={j + 1}
                                                                className="input input-bordered w-12 input-primary mt-2" // Bind the value to arrayA's current value
                                                                onChange={(e) => handleArrayAChange(e, i, j)}  // Call handleArrayAChange with i and j
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div>
                                        <label className="block">Array B</label>
                                        <div className="flex flex-col">
                                            {
                                                Array.from({ length: metrixSize }).map((_, i) => (
                                                    <input
                                                        key={i}
                                                        type="text"
                                                        placeholder={i + 1}
                                                        className="input input-bordered w-12 input-primary mt-2"// Bind the value to arrayB's current value
                                                        onChange={(e) => handleArrayBChange(e, i)}  // Call handleArrayBChange with i
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>

                                <div className="my-4">
                                    <div className="flex gap-2 flex flex-row justify-center">
                                        <button onClick={increaseMetrixSize} className="btn btn-ghost btn-sm">+</button>
                                        <button onClick={decreaseMetrixSize} className="btn btn-ghost btn-sm">-</button>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-center w-full'>
                                    <button className="btn btn-primary w-1/3" onClick={calculateGaussSeidel}>Solve</button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-4">
                                <h2 className="text-xl font-semibold">Output</h2>
                                <div className="flex flex-row justify-center gap-4">
                                    {result.length === 0 ? (
                                        metrixSize === 3 ? (
                                            <>
                                                <div className="mt-2">
                                                    <label className="block">x1</label>
                                                    <input type="text" readOnly className="input input-bordered w-20 input-primary mt-2" />
                                                </div>

                                                <div className="mt-2">
                                                    <label className="block">x2</label>
                                                    <input type="text" readOnly className="input input-bordered w-20 input-primary mt-2" />
                                                </div>

                                                <div className="mt-2">
                                                    <label className="block">x3</label>
                                                    <input type="text" readOnly className="input input-bordered w-20 input-primary mt-2" />
                                                </div>
                                            </>
                                        ) : (
                                            Array.from({ length: metrixSize }).map((_, i) => (
                                                <div key={i} className="mt-2">
                                                    <label className="block">x{i + 1}</label>
                                                    <input type="text" readOnly className="input input-bordered w-20 input-primary mt-2" />
                                                </div>
                                            ))
                                        )
                                    ) : (
                                        result.map((res, index) => (
                                            <div key={index} className="mt-2">
                                                <label className="block">x{index + 1}</label>
                                                <input type="text" value={res} readOnly className="input input-bordered w-20 input-primary mt-2" />
                                            </div>
                                        ))
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold">Output Table</h2>
                                <div className="h-80 overflow-x-auto rounded mt-2">
                                    <table className="table table-pin-rows rounded">
                                        <thead>
                                            <tr>
                                                <th className="bg-primary text-primary-content">Iteration</th>
                                                <th className="bg-primary text-primary-content">X Value</th>
                                                <th className="bg-primary text-primary-content">Error</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {outputData.iteration.length > 0 ? (
                                                outputData.iteration.slice(0, 100).map((iteration, index) => (
                                                    <tr key={index}>
                                                        <td>{iteration}</td>
                                                        <td>{outputData.xM[index].join(', ')}</td>
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
                <div className='w-full flex justify-center bg-base-100'>
                    <Plot
                        data={plotData}
                        layout={{
                            width: '100%',
                            height: 400,
                            title: 'Graph of the equations',
                            paper_bgcolor: '#ffefcc',
                            plot_bgcolor: '#ffefcc',
                            xaxis: {
                                range: [-50, 50],
                                title: 'X values',
                            },
                            yaxis: {
                                range: [-100, 100],
                                title: 'Y values',
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
    );
}

export default GaussSeidel;