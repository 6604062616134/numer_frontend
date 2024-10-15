import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function Multiple() {
    const [n, setN] = useState(''); // Number of data points
    const [x1, setX1] = useState('');
    const [x2, setX2] = useState('');
    const [x3, setX3] = useState('');
    const [y, setY] = useState(''); // Y values
    const [output, setOutput] = useState(null); // Output for predicted Y

    const handleSolve = async () => {
        const nVal = parseInt(n);

        const x1Val = x1.split(',').map((val) => parseFloat(val));
        const x2Val = x2.split(',').map((val) => parseFloat(val));
        const x3Val = x3.split(',').map((val) => parseFloat(val));

        const yVal = y.split(',').map((val) => parseFloat(val));

        if (isNaN(nVal) || yVal.some((val) => isNaN(val))) {
            alert('Invalid input. Please enter valid numbers.');
            return;
        }

        if (x1Val.length !== nVal || x2Val.length !== nVal || x3Val.length !== nVal || yVal.length !== nVal) {
            alert('Invalid input. Please enter the correct number of values.');
            return;
        }

        try{
            var sumy = 0;
            var sumx1 = 0;
            var sumx2 = 0;
            var sumx3 = 0;

            var sumx1y = 0;
            var sumx2y = 0;
            var sumx3y = 0;

            var sumx1x1 = 0;
            var sumx1x2 = 0;
            var sumx1x3 = 0;

            var sumx2x2 = 0;
            var sumx2x3 = 0;

            var sumx3x3 = 0;

            for (let i = 0; i < nVal; i++) {
                sumy += yVal[i];
                sumx1 += x1Val[i];
                sumx2 += x2Val[i];
                sumx3 += x3Val[i];

                sumx1y += x1Val[i] * yVal[i];
                sumx2y += x2Val[i] * yVal[i];
                sumx3y += x3Val[i] * yVal[i];

                sumx1x1 += x1Val[i] * x1Val[i];
                sumx1x2 += x1Val[i] * x2Val[i];
                sumx1x3 += x1Val[i] * x3Val[i];

                sumx2x2 += x2Val[i] * x2Val[i];
                sumx2x3 += x2Val[i] * x3Val[i];

                sumx3x3 += x3Val[i] * x3Val[i];
            }

            const a = math.matrix([
                [nVal, sumx1, sumx2, sumx3],
                [sumx1, sumx1x1, sumx1x2, sumx1x3],
                [sumx2, sumx1x2, sumx2x2, sumx2x3],
                [sumx3, sumx1x3, sumx2x3, sumx3x3]
            ]);

            const b = math.matrix([
                [sumy],
                [sumx1y],
                [sumx2y],
                [sumx3y]
            ]);

            const aInv = math.inv(a); // Inverse of matrix a
            const result = math.multiply(aInv, b); // Multiply the inverse of a with b

            let pp = result.get([0, 0])
            let pp1 = result.get([1, 0])
            let pp2 = result.get([2, 0])
            let pp3 = result.get([3, 0])

            setOutput(`f(x) = (${pp.toFixed(4)}) + (${pp1.toFixed(4)})X1 + (${pp2.toFixed(4)})X2 + (${pp3.toFixed(4)})X3`);
            
        }catch(e){
            alert('There was an error evaluating the function. Please check your input function.');
        }
    };

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Multiple Linear Regression</h1>
                <p className="text-justify mt-2">
                    The multiple linear regression is a statistical technique used to predict the outcome of a variable based on the value of two or more variables.
                </p>

                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className='flex flex-col w-full'>
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="flex gap-4">
                            <div className="mt-2 w-full">
                                <label className="block">Number of data points (n)</label>
                                <input
                                    type="text"
                                    placeholder='n value'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={n}
                                    onChange={(e) => setN(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">Y</label>
                                <input
                                    type="text"
                                    placeholder='separated by comma'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={y}
                                    onChange={(e) => setY(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="mt-2 w-full">
                                <label className="block">X1</label>
                                <input
                                    type="text"
                                    placeholder='separated by semicolon'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={x1}
                                    onChange={(e) => setX1(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">X2</label>
                                <input
                                    type="text"
                                    placeholder='separated by semicolon'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={x2}
                                    onChange={(e) => setX2(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">X3</label>
                                <input
                                    type="text"
                                    placeholder='separated by semicolon'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={x3}
                                    onChange={(e) => setX3(e.target.value)}
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
                                <p>Answer : {output !== null ? output : 'No data'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Multiple;
