import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function MatrixInversion() {
    const [metrixSize, setMetrixSize] = useState(3);

    const [arrayA, setArrayA] = useState(Array(metrixSize).fill().map(() => Array(metrixSize).fill('')));
    const [arrayB, setArrayB] = useState(Array(metrixSize).fill(''));
    const [result, setResult] = useState([]);

    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        console.log("Result updated:", result);
        updatePlotData(); // Update plot data when result changes
    }, [result]);

    const increaseMetrixSize = () => {
        setMetrixSize(metrixSize + 1);
        setArrayA([...arrayA, Array(metrixSize).fill('')]);
        setArrayB([...arrayB, '']);
    };

    const decreaseMetrixSize = () => {
        if (metrixSize === 2) return;
        setMetrixSize(metrixSize - 1);
        setArrayA(arrayA.slice(0, -1));
        setArrayB(arrayB.slice(0, -1));
    };

    const handleArrayAChange = (e, i, j) => {
        const newArrayA = [...arrayA];
        newArrayA[i][j] = e.target.value;
        setArrayA(newArrayA);
    };

    const handleArrayBChange = (e, i) => {
        const newArrayB = [...arrayB];
        newArrayB[i] = e.target.value;
        setArrayB(newArrayB);
    };

    const [isCollapsed, setIsCollapsed] = useState(false);

    const MatrixInversion = (A, B) => {
        const n = A.length;
        const L = Array(n).fill().map(() => Array(n).fill(0));
        const U = Array(n).fill().map(() => Array(n).fill(0));
        const X = Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i <= j) {
                    U[i][j] = A[i][j];
                    for (let k = 0; k < i; k++) {
                        U[i][j] -= L[i][k] * U[k][j];
                    }
                    if (i === j) L[i][j] = 1;
                } else {
                    L[i][j] = A[i][j];
                    for (let k = 0; k < j; k++) {
                        L[i][j] -= L[i][k] * U[k][j];
                    }
                    L[i][j] /= U[j][j];
                    U[i][j] = 0;
                }
            }
        }

        const Y = Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            Y[i] = B[i];
            for (let j = 0; j < i; j++) {
                Y[i] -= L[i][j] * Y[j];
            }
        }

        for (let i = n - 1; i >= 0; i--) {
            X[i] = Y[i];
            for (let j = n - 1; j > i; j--) {
                X[i] -= U[i][j] * X[j];
            }
            X[i] /= U[i][i];
        }

        return X;
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
                    <h1 className="text-3xl font-bold">Matrix inversion</h1>
                    <p className="text-justify mt-2">
                        In linear algebra, the inverse of a matrix is a matrix that, when multiplied with the original matrix, gives an identity matrix. The inverse of a matrix A is denoted as A<sup>-1</sup>. The inverse of a matrix is calculated using the LU decomposition method.
                    </p>

                    {/* input & table section */}
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
                                <div className="flex flex-row justify-center w-full">
                                    <button className="btn btn-primary w-1/3" onClick={() => {
                                        // Convert arrayA and arrayB to numbers before passing them to LUdecomposition
                                        const parsedA = arrayA.map(row => row.map(value => parseFloat(value) || 0));
                                        const parsedB = arrayB.map(value => parseFloat(value) || 0);

                                        setResult(MatrixInversion(parsedA, parsedB));
                                    }}>Solve</button>
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
                            </div>
                        </div>
                    </div>
                    {/* graph section */}
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
        </div>
    );
}

export default MatrixInversion;