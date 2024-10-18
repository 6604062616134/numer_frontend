import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

//ต้องมีตารางด้วย
function Conjugate() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [metrixSize, setMetrixSize] = useState(3);
    const [arrayA, setArrayA] = useState(Array(metrixSize).fill().map(() => Array(metrixSize).fill('')));
    const [arrayB, setArrayB] = useState(Array(metrixSize).fill(''));
    const [result, setResult] = useState([]);

    useEffect(() => {
        console.log("Result updated:", result);
    }, [result]);

    const calculateConjugate = () => {
        const rows = arrayA.length;
        const cols = arrayA[0].length;

        // Convert string inputs to numbers for calculations
        const matrixA = arrayA.map(row => row.map(value => parseFloat(value)));
        const matrixB = arrayB.map(value => parseFloat(value));

        // Validate if any input is not a valid number
        if (matrixA.some(row => row.includes(NaN)) || matrixB.includes(NaN)) {
            alert("Please enter valid numbers in the matrices.");
            return;
        }

        // Check for valid matrix dimensions
        if (rows !== cols || matrixA.length !== matrixB.length) {
            alert("Array size does not match matrix dimensions.");
            return;
        }

        // Check if the matrix is symmetric
        const isSymmetric = matrixA.every((row, i) => row.every((value, j) => value === matrixA[j][i]));
        if (!isSymmetric) {
            alert("Matrix A must be symmetric for the conjugate gradient method.");
            return;
        }

        // Initialize the conjugate gradient method
        let x = Array(metrixSize).fill(0); // Initial guess
        let r = math.subtract(matrixB, math.multiply(matrixA, x)); // Initial residual r = b - A*x
        let p = [...r]; // Initial direction p = r
        let rsOld = math.dot(r, r); // Initial value of r^T * r

        const tolerance = 1e-6;
        const maxIterations = 1000;

        for (let i = 0; i < maxIterations; i++) {
            const Ap = math.multiply(matrixA, p); // A * p
            const alpha = rsOld / math.dot(p, Ap); // Step size α = (r^T * r) / (p^T * A * p)
            x = math.add(x, math.multiply(alpha, p)); // Update x = x + α * p
            r = math.subtract(r, math.multiply(alpha, Ap)); // Update residual r = r - α * A * p

            const rsNew = math.dot(r, r); // New value of r^T * r
            if (Math.sqrt(rsNew) < tolerance) {
                break; // Convergence check
            }

            const beta = rsNew / rsOld; // Update β = (r_new^T * r_new) / (r_old^T * r_old)
            p = math.add(r, math.multiply(beta, p)); // Update direction p = r + β * p
            rsOld = rsNew;
        }

        setResult(x); // Update the state with the result
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conjugate;