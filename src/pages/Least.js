import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';
import * as math from 'mathjs';

function Least() {
    const [n, setN] = useState(''); // จำนวน x
    const [x, setX] = useState(''); // ค่า x ตามจำนวน n
    const [y, setY] = useState(''); // ค่า y ตามจำนวน n
    const [mode, setMode] = useState(''); // linear, polynomial
    const [xValue, setXValue] = useState(''); // ค่า x ที่ต้องการหาค่า y
    const [output, setOutput] = useState(null); // ค่า y ที่หาได้ จาก xValue

    const handleSolve = async () => {
        const parsedN = parseInt(n); // convert n to a number
        const xArray = x.replace(/\s+/g, '').split(',').map(Number);
        const yArray = y.replace(/\s+/g, '').split(',').map(Number);
        const xVal = Number(xValue); // parse the input x value for calculation

        // Input validation
        if (mode === '' || n === '' || x === '' || y === '' || xValue === '') {
            alert("Please fill all input fields.");
            return;
        }

        if (xArray.some(isNaN) || yArray.some(isNaN) || parsedN !== xArray.length || parsedN !== yArray.length) {
            alert("Invalid number of x or y or invalid values.");
            return;
        }

        if (isNaN(xVal)) {
            alert("Invalid value for the input x.");
            return;
        }

        if (mode === 'linear') {
            // Linear regression calculation
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

            for (let i = 0; i < parsedN; i++) {
                sumX += xArray[i];
                sumY += yArray[i];
                sumXY += xArray[i] * yArray[i];
                sumX2 += xArray[i] ** 2;
            }

            const a = (parsedN * sumXY - sumX * sumY) / (parsedN * sumX2 - sumX ** 2);
            const b = (sumY - a * sumX) / parsedN;

            setOutput(a * xVal + b);

        } else if (mode === 'polynomial') {
            const degree = parsedN - 1; // Degree of the polynomial (n data points imply degree n-1)

            // Create X matrix with rows based on the degree of the polynomial
            const xMatrix = [];
            for (let i = 0; i < parsedN; i++) {
                const row = [];
                for (let j = 0; j <= degree; j++) { // Degree goes from 0 to degree (n-1)
                    row.push(xArray[i] ** j);
                }
                xMatrix.push(row);
            }

            // Y matrix is a column vector
            const yMatrix = yArray.map(val => [val]);

            try {
                // X^T * X
                const xMatrixT = math.transpose(xMatrix);
                const xMatrixT_xMatrix = math.multiply(xMatrixT, xMatrix);

                // X^T * Y
                const xMatrixT_yMatrix = math.multiply(xMatrixT, yMatrix);

                // Inverse of X^T * X
                const inv_xMatrixT_xMatrix = math.inv(xMatrixT_xMatrix);

                // Solve for coefficients aMatrix = (X^T * X)^(-1) * (X^T * Y)
                const aMatrix = math.multiply(inv_xMatrixT_xMatrix, xMatrixT_yMatrix);

                //console.log(aMatrix[0]);

                // Calculate the predicted y value at xValue
                let result = 0;
                for (let i = 0; i <= degree; i++) {
                    result += aMatrix[i][0] * (xVal ** i);
                }

                setOutput(result); // Set the result as the predicted y value
            } catch (error) {
                console.error("Error in polynomial regression calculation: ", error);
                alert("Cannot compute polynomial regression. Please check your input.");
            }
        }

    };

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Least square regression</h1>
                <p className="text-justify mt-2">
                    Least square regression is a method to find the best-fitting curve for a given set of data points. The curve can be linear, quadratic, cubic, or any other polynomial. The method minimizes the sum of the squares of the differences between the observed values and the values predicted by the curve
                </p>

                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className='flex flex-col w-full'>
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="flex gap-4">
                            <div className="mt-2 w-full">
                                <label className="block">Select type</label>
                                <input
                                    type="text"
                                    placeholder='linear, polynomial'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">Number of initial x,y value(n)</label>
                                <input
                                    type="text"
                                    placeholder='(n value)'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={n}
                                    onChange={(e) => setN(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">X</label>
                                <input
                                    type="text"
                                    placeholder='Input x value to find y value'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={xValue}
                                    onChange={(e) => setXValue(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="mt-2 w-full">
                                <label className="block">X value</label>
                                <input
                                    type="text"
                                    placeholder='(n value)'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={x}
                                    onChange={(e) => setX(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">Y value</label>
                                <input
                                    type="text"
                                    placeholder='(n value)'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={y}
                                    onChange={(e) => setY(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button className="btn btn-primary btn-block" onClick={handleSolve}>
                                Solve
                            </button>
                        </div>

                        <div className='mt-4'>
                            <h2 className="text-xl font-semibold">Output</h2>
                            <div className="text-lg">
                                <p>Answer : {output ? output : 'No data'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Least;
