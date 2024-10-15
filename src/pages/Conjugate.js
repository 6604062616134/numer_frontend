import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

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
        const matrixB = arrayB.map(value => [parseFloat(value)]);

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

        const detA = math.det(matrixA);
        if (detA === 0) {
            alert('Determinant of matrix A is zero, no unique solution exists.');
            return;
        }

        let answer = [];
        
        

        answer.push(xi);
        setResult(answer); // Update the state with the result
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold">Conjugate-gradient method</h1>
                    <p className="text-justify mt-2">
                        kjksjgksjergjserigjijk
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
                                <button className="btn btn-primary w-1/3" onClick={calculateGaussian}>Solve</button>
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