import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function LU() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [metrixSize, setMetrixSize] = useState(3);

    const [arrayA, setArrayA] = useState(Array(metrixSize).fill().map(() => Array(metrixSize).fill('')));
    const [arrayB, setArrayB] = useState(Array(metrixSize).fill(''));
    const [result, setResult] = useState([]);


    useEffect(() => {

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

    const LUdecomposition = (A, B) => {
        const n = A.length;
        const L = Array(n).fill().map(() => Array(n).fill(0));
        const U = Array(n).fill().map(() => Array(n).fill(0));

        // Convert A and B to numbers
        A = A.map(row => row.map(value => parseFloat(value)));
        B = B.map(value => parseFloat(value));

        for (let i = 0; i < n; i++) {
            L[i][i] = 1;
        }

        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++) {
                    sum += L[i][k] * U[k][j];
                }
                U[i][j] = A[i][j] - sum;
            }

            for (let j = i; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < i; k++) {
                    sum += L[j][k] * U[k][i];
                }
                L[j][i] = (A[j][i] - sum) / U[i][i];
            }
        }

        const Y = Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * Y[j];
            }
            Y[i] = (B[i] - sum) / L[i][i];
        }

        const X = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += U[i][j] * X[j];
            }
            X[i] = (Y[i] - sum) / U[i][i];
        }

        return X;
    };


    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">LU decomposition</h1>
                    <p className="text-justify mt-2">
                        LU decomposition is a method to factorize a matrix into a lower triangular matrix and an upper triangular matrix. It is used to solve systems of linear equations, such as Ax = b, where A is a square matrix and x, b are vectors.
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

                            </div>
                            <div className="flex flex-row justify-center">
                                <button className="btn btn-primary w-1/3" onClick={() => {
                                    // Convert arrayA and arrayB to numbers before passing them to LUdecomposition
                                    const parsedA = arrayA.map(row => row.map(value => parseFloat(value) || 0));
                                    const parsedB = arrayB.map(value => parseFloat(value) || 0);

                                    setResult(LUdecomposition(parsedA, parsedB));
                                }}>Solve</button>
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
                </div>
            </div>
        </div>
    );
}

export default LU;