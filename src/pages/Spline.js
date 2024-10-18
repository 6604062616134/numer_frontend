import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function Spline() {
    const [n, setN] = useState(''); // จำนวน x
    const [x, setX] = useState(''); // ค่า x ตามจำนวน n
    const [y, setY] = useState(''); // ค่า y ตามจำนวน n
    const [mode, setMode] = useState(''); // linear, quadratic, cubic
    const [xValue, setXValue] = useState(''); // ค่า x ที่ต้องการหาค่า y

    const [m, setM] = useState(''); // slope
    const [output, setOutput] = useState(null); // ค่า y ที่หาได้ จาก xValue
    const [graphData, setGraphData] = useState({ x: [], y: [] });

    const handleSolve = () => {
        if (mode === '' || n === '' || x === '' || y === '' || xValue === '') {
            alert("Please fill all input fields.");
            return;
        }

        const xArray = x.split(',').map(Number);
        const yArray = y.split(',').map(Number);

        if (n != xArray.length || n != yArray.length) {
            alert("Invalid number of x or y.");
            return;
        }

        const mArray = [];
        for (let i = 1; i < xArray.length; i++) {
            const m = (yArray[i] - yArray[i - 1]) / (xArray[i] - xArray[i - 1]);
            mArray.push(m);
        }
        setM(mArray);

        const findIntervalIndex = (xArray, xValue) => {
            for (let i = 0; i < xArray.length - 1; i++) {
                if (xValue >= xArray[i] && xValue <= xArray[i + 1]) {
                    return i;
                }
            }
            return -1;
        };

        let intervalIndex = findIntervalIndex(xArray, xValue);
        if (intervalIndex === -1) {
            alert("xValue is out of bounds.");
            return;
        }

        let result = 0;
        if (mode === 'linear') {
            result = linearInterpolation(xArray, yArray, mArray, intervalIndex, xValue);
        } else if (mode === 'quadratic') {
            result = quadraticInterpolation(xArray, yArray, intervalIndex, xValue);
        } else if (mode === 'cubic') {
            result = cubicInterpolation(xArray, yArray, intervalIndex, xValue);
        }

        setOutput(result);

        const graphX = Array.from({ length: 100 }, (_, i) => i - 50);
        const graphY = graphX.map(val => {
            if (mode === 'linear') {
                return linearInterpolation(xArray, yArray, mArray, intervalIndex, val);
            } else if (mode === 'quadratic') {
                return quadraticInterpolation(xArray, yArray, intervalIndex, val);
            } else if (mode === 'cubic') {
                return cubicInterpolation(xArray, yArray, intervalIndex, val);
            }
        });

        setGraphData({ x: graphX, y: graphY });
    };

    const linearInterpolation = (xArray, yArray, mArray, intervalIndex, xValue) => {
        const m = mArray[intervalIndex];
        const x0 = xArray[intervalIndex];
        const y0 = yArray[intervalIndex];
        return y0 + m * (xValue - x0);
    };

    const quadraticInterpolation = (x, y, intervalIndex, xValue) => {
        return (
            y[0] * ((xValue - x[1]) * (xValue - x[2])) / ((x[0] - x[1]) * (x[0] - x[2])) +
            y[1] * ((xValue - x[0]) * (xValue - x[2])) / ((x[1] - x[0]) * (x[1] - x[2])) +
            y[2] * ((xValue - x[0]) * (xValue - x[1])) / ((x[2] - x[0]) * (x[2] - x[1]))
        );
    };

    const cubicInterpolation = (x, y, intervalIndex, xValue) => {
        return (
            y[0] * ((xValue - x[1]) * (xValue - x[2]) * (xValue - x[3])) / ((x[0] - x[1]) * (x[0] - x[2]) * (x[0] - x[3])) +
            y[1] * ((xValue - x[0]) * (xValue - x[2]) * (xValue - x[3])) / ((x[1] - x[0]) * (x[1] - x[2]) * (x[1] - x[3])) +
            y[2] * ((xValue - x[0]) * (xValue - x[1]) * (xValue - x[3])) / ((x[2] - x[0]) * (x[2] - x[1]) * (x[2] - x[3])) +
            y[3] * ((xValue - x[0]) * (xValue - x[1]) * (xValue - x[2])) / ((x[3] - x[0]) * (x[3] - x[1]) * (x[3] - x[2]))
        );
    };

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Spline interpolation</h1>
                <p className="text-justify mt-2">
                    Spline interpolation is a form of interpolation where the interpolant is a piecewise-defined function called a spline. Spline interpolation is often preferred over polynomial interpolation because it produces a smoother curve that passes through all the given data points. The most common form of spline interpolation is cubic spline interpolation, which uses piecewise cubic polynomials to interpolate the data points.
                </p>

                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className='flex flex-col w-full'>
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="flex gap-4">
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

                        <div className="flex gap-4 w-full">
                            <div className="mt-2 w-full">
                                <label className="block">Select type</label>
                                <input
                                    type="text"
                                    placeholder='linear, quadratic, cubic'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
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

                        <div className="mt-6">
                            <button className="btn btn-primary btn-block" onClick={handleSolve}>
                                Solve
                            </button>
                        </div>

                        <div className='mt-4'>
                            <h2 className="text-xl font-semibold">Output</h2>
                            <div className="text-lg">
                                <p>Answer : {output ? output : 'No data'}</p>
                                <p>m : {m ? m.join(', ') : 'No data'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-center bg-base-100'>
                    <Plot
                        data={[{
                            x: graphData.x,
                            y: graphData.y,
                            type: 'scatter',
                            mode: 'lines',
                            marker: { color: 'black' },
                        }]}
                        layout={{
                            width: '100%',
                            height: 400,
                            title: 'Graph of Spline Interpolation',
                            paper_bgcolor: '#ffefcc',
                            plot_bgcolor: '#ffefcc',
                            xaxis: {
                                range: [-50, 50],
                            },
                            yaxis: {
                                range: [-100, 100],
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

export default Spline;
