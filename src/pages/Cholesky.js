import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function Cholesky() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [metrixSize, setMetrixSize] = useState(3);
    const [arrayA, setArrayA] = useState(Array(metrixSize).fill().map(() => Array(metrixSize).fill('')));
    const [arrayB, setArrayB] = useState(Array(metrixSize).fill(''));
    const [result, setResult] = useState([]);
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        console.log("Result updated:", result);
        updatePlotData();
    }, [result]);

    const increaseMetrixSize = () => {
        const newSize = metrixSize + 1;
        setMetrixSize(newSize);
        setArrayA(arrayA.map(row => [...row, '']).concat([Array(newSize).fill('')]));
        setArrayB([...arrayB, '']);
    };

    const decreaseMetrixSize = () => {
        if (metrixSize === 2) return;
        const newSize = metrixSize - 1;
        setMetrixSize(newSize);
        setArrayA(arrayA.slice(0, newSize).map(row => row.slice(0, newSize)));
        setArrayB(arrayB.slice(0, newSize));
    };

    const handleArrayAChange = (e, i, j) => {
        const newArrayA = arrayA.map(row => [...row]);
        newArrayA[i][j] = e.target.value || '';
        setArrayA(newArrayA);
    };

    const handleArrayBChange = (e, i) => {
        const newArrayB = [...arrayB];
        newArrayB[i] = e.target.value;
        setArrayB(newArrayB);
    };

    const isSymmetric = (A) => {
        const n = A.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (parseFloat(A[i][j]) !== parseFloat(A[j][i])) {
                    return false;
                }
            }
        }
        return true;
    };

    const CholeskyDecomposition = (A, B) => {
        const parsedA = A.map(row => row.map(value => parseFloat(value) || 0));
        const parsedB = B.map(value => parseFloat(value) || 0);

        if (!isSymmetric(parsedA)) {
            alert("Matrix A is not symmetric!");
            return;
        }

        const n = parsedA.length;
        const L = Array(n).fill().map(() => Array(n).fill(0));

        // Cholesky decomposition
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= i; j++) {
                let sum = 0;
                for (let k = 0; k < j; k++) {
                    sum += L[i][k] * L[j][k];
                }
                if (i === j) {
                    L[i][j] = Math.sqrt(parsedA[i][i] - sum);
                } else {
                    L[i][j] = (parsedA[i][j] - sum) / L[j][j];
                }
            }
        }

        // Forward substitution
        const Y = Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * Y[j];
            }
            Y[i] = (parsedB[i] - sum) / L[i][i];
        }

        // Backward substitution
        const X = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += L[j][i] * X[j]; // Use L[j][i] for backward substitution
            }
            X[i] = (Y[i] - sum) / L[i][i];
        }

        console.log(X);
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
                    <h1 className="text-3xl font-bold">Cholesky decomposition</h1>
                    <p className="text-justify mt-2">
                        Cholesky decomposition is a method for solving symmetric positive definite systems of linear equations. It is mainly used in numerical analysis. The Cholesky decomposition is roughly twice as efficient as the LU decomposition for solving systems of linear equations.
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
                                                                className="input input-bordered w-12 input-primary mt-2"
                                                                onChange={(e) => handleArrayAChange(e, i, j)}
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
                                                        className="input input-bordered w-12 input-primary mt-2"
                                                        onChange={(e) => handleArrayBChange(e, i)}
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
                                        const parsedA = arrayA.map(row => row.map(value => parseFloat(value) || 0));
                                        const parsedB = arrayB.map(value => parseFloat(value) || 0);

                                        if (!isSymmetric(parsedA)) {
                                            alert("Matrix A is not symmetric!");
                                            return;
                                        }

                                        setResult(CholeskyDecomposition(parsedA, parsedB));
                                    }}>
                                        Solve
                                    </button>
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
                                            <>
                                                {Array.from({ length: metrixSize }).map((_, i) => (
                                                    <div key={i} className="mt-2">
                                                        <label className="block">x{i + 1}</label>
                                                        <input type="text" readOnly className="input input-bordered w-20 input-primary mt-2" />
                                                    </div>
                                                ))}
                                            </>
                                        )
                                    ) : (
                                        result.map((value, index) => (
                                            <div key={index} className="mt-2">
                                                <label className="block">x{index + 1}</label>
                                                <input type="text" readOnly value={value} className="input input-bordered w-20 input-primary mt-2" />
                                            </div>
                                        ))
                                    )}
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
        </div>
    );
}

export default Cholesky;
