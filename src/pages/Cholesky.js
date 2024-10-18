import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function Cholesky() {
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

    const isSymmetric = (A) => {
        const n = A.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {  // Only need to check below the diagonal
                if (A[i][j] !== A[j][i]) {
                    return false;
                }
            }
        }
        return true;
    };

    const CholeskyDecomposition = (A, B) => {
        if (!isSymmetric(A)) {
            alert("Matrix A is not symmetric!");
            return;
        } else {
            const n = A.length;
            const L = Array(n).fill().map(() => Array(n).fill(0));
            const LT = Array(n).fill().map(() => Array(n).fill(0));

            // Convert A and B to numbers
            A = A.map(row => row.map(value => parseFloat(value)));
            B = B.map(value => parseFloat(value));

            for (let i = 0; i < n; i++) {
                L[i][i] = 1;
            }

            let l11 = Math.sqrt(A[0][0]);
            L[0][0] = l11;
            LT[0][0] = l11;

            let l21 = A[0][1] / L[0][0];
            L[1][0] = l21;
            LT[0][1] = l21;

            let l31 = A[0][2] / L[0][0];
            L[2][0] = l31;
            LT[0][2] = l31;

            let l22 = Math.sqrt(A[1][1] - L[1][0] * L[1][0]);
            L[1][1] = l22;
            LT[1][1] = l22;

            let l32 = (A[1][2] - L[1][0] * L[2][0]) / L[1][1];
            L[2][1] = l32;
            LT[1][2] = l32;

            let l33 = Math.sqrt(A[2][2] - L[2][0] * L[2][0] - L[2][1] * L[2][1]);
            L[2][2] = l33;
            LT[2][2] = l33;

            // Forward substitution
            const Y = Array(n).fill(0);
            Y[0] = B[0] / L[0][0];
            Y[1] = (B[1] - L[1][0] * Y[0]) / L[1][1];
            Y[2] = (B[2] - L[2][0] * Y[0] - L[2][1] * Y[1]) / L[2][2];

            // Backward substitution
            const X = Array(n).fill(0);
            X[2] = Y[2] / LT[2][2];
            X[1] = (Y[1] - LT[1][2] * X[2]) / LT[1][1];
            X[0] = (Y[0] - LT[0][1] * X[1] - LT[0][2] * X[2]) / LT[0][0];

            console.log(X);
            console.log(typeof X);
            return X;
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

                                        setResult(CholeskyDecomposition(parsedA, parsedB));
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
                </div>
            </div>
        </div>
    );
}

export default Cholesky;