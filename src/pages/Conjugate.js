import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';
import Plot from 'react-plotly.js';

function Conjugate() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [metrixSize, setMetrixSize] = useState(3);
    const [arrayA, setArrayA] = useState(Array(metrixSize).fill().map(() => Array(metrixSize).fill('')));
    const [arrayB, setArrayB] = useState(Array(metrixSize).fill(''));
    const [result, setResult] = useState([]);
    const [plotData, setPlotData] = useState([]);

    const [outputData, setOutputData] = useState({ iteration: [], xM: [], error: [] });

    useEffect(() => {
        console.log("Result updated:", result);
        updatePlotData();
    }, [result]);

    const calculateConjugate = () => {
        const rows = arrayA.length;
        const cols = arrayA[0].length;

        const matrixA = arrayA.map(row => row.map(value => parseFloat(value)));
        const matrixB = arrayB.map(value => parseFloat(value));

        if (matrixA.some(row => row.includes(NaN)) || matrixB.includes(NaN)) {
            alert("Please enter valid numbers in the matrices.");
            return;
        }

        if (rows !== cols || matrixA.length !== matrixB.length) {
            alert("Array size does not match matrix dimensions.");
            return;
        }

        const isSymmetric = matrixA.every((row, i) => row.every((value, j) => value === matrixA[j][i]));
        if (!isSymmetric) {
            alert("Matrix A must be symmetric for the conjugate gradient method.");
            return;
        }

        let x = Array(metrixSize).fill(0);
        let r = math.subtract(matrixB, math.multiply(matrixA, x));
        let p = [...r];
        let rsOld = math.dot(r, r);
        const tolerance = 1e-6;
        const maxIterations = 1000;
        let newOutputData = { iteration: [], xM: [], error: [] };

        for (let i = 0; i < maxIterations; i++) {
            const Ap = math.multiply(matrixA, p);
            const alpha = rsOld / math.dot(p, Ap);
            x = math.add(x, math.multiply(alpha, p));
            r = math.subtract(r, math.multiply(alpha, Ap));

            const rsNew = math.dot(r, r);
            const error = Math.sqrt(rsNew);

            newOutputData.iteration.push(i + 1);  // Store the iteration number
            newOutputData.xM.push([...x]);         // Store the current x values
            newOutputData.error.push(error);        // Store the current error

            if (error < tolerance) {
                break; // Convergence check
            }

            const beta = rsNew / rsOld;
            p = math.add(r, math.multiply(beta, p));
            rsOld = rsNew;
        }

        setResult(x);
        setOutputData(newOutputData);
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

    const increaseMetrixSize = () => {
        if (metrixSize < 5) {
            setMetrixSize(metrixSize + 1);
            setArrayA(Array(metrixSize + 1).fill().map(() => Array(metrixSize + 1).fill('')));
            setArrayB(Array(metrixSize + 1).fill(''));
        }
    };

    const decreaseMetrixSize = () => {
        if (metrixSize > 2) {
            setMetrixSize(metrixSize - 1);
            setArrayA(Array(metrixSize - 1).fill().map(() => Array(metrixSize - 1).fill('')));
            setArrayB(Array(metrixSize - 1).fill(''));
        }
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
                    <h1 className="text-3xl font-bold">Conjugate-gradient method</h1>
                    <p className="text-justify mt-2">
                        The conjugate gradient method is an algorithm for the numerical solution of particular systems of linear equations, namely those whose matrix is symmetric and positive-definite. The conjugate gradient method is often implemented as an iterative algorithm, applicable to sparse systems that are too large to be handled by a direct implementation or other direct methods such as the Cholesky decomposition.
                    </p>

                    <div className="flex flex-col lg:flex-row mt-6 gap-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-xl font-semibold">Input</h2>
                            <div className="mt-2 flex flex-row gap-4 justify-center">
                                <div>
                                    <label className="block">Array A</label>
                                    {Array.from({ length: metrixSize }).map((_, i) => (
                                        <div key={i} className="flex gap-1">
                                            {Array.from({ length: metrixSize }).map((_, j) => (
                                                <input
                                                    key={j}
                                                    type="text"
                                                    placeholder={j + 1}
                                                    className="input input-bordered w-12 input-primary mt-2"
                                                    onChange={(e) => handleArrayAChange(e, i, j)}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="block">Array B</label>
                                    <div className="flex flex-col">
                                        {Array.from({ length: metrixSize }).map((_, i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                placeholder={i + 1}
                                                className="input input-bordered w-12 input-primary mt-2"
                                                onChange={(e) => handleArrayBChange(e, i)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="my-4">
                                <div className="flex gap-2 justify-center">
                                    <button onClick={increaseMetrixSize} className="btn btn-ghost btn-sm">+</button>
                                    <button onClick={decreaseMetrixSize} className="btn btn-ghost btn-sm">-</button>
                                </div>
                            </div>

                            <div className="flex justify-center w-full">
                                <button className="btn btn-primary w-1/3" onClick={calculateConjugate}>Solve</button>
                            </div>

                            <div className="flex flex-col gap-4 mt-4">
                                <h2 className="text-xl font-semibold">Output</h2>
                                <div className="flex justify-center gap-4">
                                    {result.length === 0 ? (
                                        Array.from({ length: metrixSize }).map((_, i) => (
                                            <div key={i} className="mt-2">
                                                <label className="block">x{i + 1}</label>
                                                <input type="text" readOnly className="input input-bordered w-20 input-primary mt-2" />
                                            </div>
                                        ))
                                    ) : (
                                        result.map((res, index) => (
                                            <div key={index} className="mt-2">
                                                <label className="block">x{index + 1}</label>
                                                <input type="text" value={res} readOnly className="input input-bordered w-20 input-primary mt-2" />
                                            </div>
                                        ))
                                    )}
                                </div>
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

export default Conjugate;