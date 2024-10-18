import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function Cramer() {
    const [metrixSize, setMetrixSize] = useState(3);

    const [arrayA, setArrayA] = useState(Array(metrixSize).fill().map(() => Array(metrixSize).fill('')));
    const [arrayB, setArrayB] = useState(Array(metrixSize).fill(''));
    const [result, setResult] = useState([]);


    useEffect(() => {

    }, [result]);

    // Function to calculate using Cramer's Rule
    const calculateCramersRule = () => {
        // const rows = arrayA.length;
        const cols = arrayA[0].length;

        // Validate array sizes
        if (arrayA.length !== arrayB.length || arrayA.some(row => row.length !== cols)) {
            alert("Array size does not match matrix dimensions");
            return;
        }

        const matrixA = arrayA;
        const matrixB = arrayB.map(value => [value]);

        const detA = math.det(matrixA);

        console.log("detA", detA);

        if (detA === 0) {
            alert('Determinant of matrix A is zero, no unique solution exists');
            return;
        }

        function replaceColumn(matrix, column, replacement) {
            return matrix.map((row, index) => {
                const newRow = [...row];
                newRow[column] = replacement[index][0];
                return newRow;
            });
        }

        let answer = [];

        for (let i = 0; i < cols; i++) {
            const detAi = math.det(replaceColumn(matrixA, i, matrixB));
            console.log("detAi", detAi);
            const xi = detAi / detA;
            console.log("xi", xi);
            answer.push(xi);
        }

        setResult(answer); // Update the state with the result
    };

    const increaseMetrixSize = () => {
        if (metrixSize < 5) {
            setMetrixSize(metrixSize + 1);
        }
    }

    const decreaseMetrixSize = () => {
        if (metrixSize > 2) {
            setMetrixSize(metrixSize - 1);
        }
    }

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
    }

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Cramer's rule</h1>
                    <p className="text-justify mt-2">
                        In linear algebra, Cramer's rule is an explicit formula for the solution of a system of linear equations with as many equations as unknowns, valid whenever the system has a unique solution. It is named after Gabriel Cramer (1704–1752), who published the rule for an arbitrary number of unknowns in 1750, although Colin Maclaurin also published special cases of the rule in 1748, and it is even older in the special case of 2 equations.
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

                                <div className='flex flex-row justify-center w-full'>
                                    <button className="btn btn-primary w-1/3" onClick={calculateCramersRule}>Solve</button>
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
                </div>
            </div>
        </div>
    );
}

export default Cramer;
