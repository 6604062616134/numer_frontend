import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function Lagrange() {
    const [n, setN] = useState(''); 
    const [x, setX] = useState(''); 
    const [y, setY] = useState(''); 
    const [mode, setMode] = useState(''); 
    const [xValue, setXValue] = useState(''); 
    const [points, setPoints] = useState(''); 
    const [l, setL] = useState([]);

    const [output, setOutput] = useState(null); 
    const [graphData, setGraphData] = useState({ x: [], y: [] });

    const handleSolve = async () => {
        if (mode === '' || n === '' || x === '' || y === '' || xValue === '' || points.length === 0) {
            alert("Please fill all input fields.");
            return;
        }

        const xArray = x.split(',').map(Number);
        const yArray = y.split(',').map(Number);
        const pointsArray = points.split(',').map(Number).map(i => i - 1);

        if (n != xArray.length || n != yArray.length) {
            alert("Invalid number of x or y.");
            return;
        }

        let validPoints = true;
        for (let i = 0; i < pointsArray.length; i++) {
            if (pointsArray[i] < 0 || pointsArray[i] >= xArray.length) {
                validPoints = false;
                alert(`Invalid point index at position ${i}.`);
                break;
            }
        }
        if (!validPoints) return;

        let selectedPointsX = pointsArray.map(i => xArray[i]);
        let selectedPointsY = pointsArray.map(i => yArray[i]);

        console.log("Selected X:", selectedPointsX);
        console.log("Selected Y:", selectedPointsY);

        let result = 0;

        if (mode === 'linear') {
            result = linearInterpolation(selectedPointsX, selectedPointsY, xValue);
        } else if (mode === 'quadratic') {
            result = quadraticInterpolation(selectedPointsX, selectedPointsY, xValue);
        } else if (mode === 'polynomial') {
            result = polynomialInterpolation(selectedPointsX, selectedPointsY, xValue);
        }

        console.log("Result:", result);
        setOutput(result);

        const graphX = Array.from({ length: 100 }, (_, i) => i - 50); 
        const graphY = graphX.map(val => polynomialInterpolation(selectedPointsX, selectedPointsY, val)); 

        setGraphData({ x: graphX, y: graphY });
    };

    const linearInterpolation = (x, y, xValue) => {
        let L0 = (x[1] - xValue) / (x[1] - x[0]);
        let L1 = (x[0] - xValue) / (x[0] - x[1]);

        setL([L0, L1]);

        return L0 * y[0] + L1 * y[1];
    }

    const quadraticInterpolation = (x, y, xValue) => {
        let L0 = ((x[2] - xValue) * (x[1] - xValue)) / ((x[2] - x[0]) * (x[1] - x[0]));
        let L1 = ((x[2] - xValue) * (x[0] - xValue)) / ((x[2] - x[1]) * (x[0] - x[1]));
        let L2 = ((x[1] - xValue) * (x[0] - xValue)) / ((x[1] - x[2]) * (x[0] - x[2]));

        setL([L0, L1, L2]);

        return L0 * y[0] + L1 * y[1] + L2 * y[2];
    }

    const polynomialInterpolation = (x, y, xValue) => {
        let result = 0;
        let lagrangeBasis = [];

        for (let i = 0; i < x.length; i++) {
            let Li = 1;

            for (let j = 0; j < x.length; j++) {
                if (i !== j) {
                    Li *= (xValue - x[j]) / (x[i] - x[j]);
                }
            }

            lagrangeBasis.push(Li);
            result += Li * y[i];
        }

        setL(lagrangeBasis);
        return result;
    };

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Lagrange interpolation</h1>
                <p className="text-justify mt-2">
                    The Lagrange interpolation is a method of finding a polynomial that passes through a set of points.
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
                                    placeholder='linear, quadratic, polynomial'
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
                            <div className="mt-2 w-full">
                                <label className="block">Points(start with 0)</label>
                                <input
                                    type="text"
                                    placeholder='eg. linear=1,2/ quad=1,2,3/ poly=1,2,3,4,5'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
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
                                <p>L : {l ? l.join(', ') : 'No data'}</p>
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
                            title: 'Graph of Lagrange Polynomial',
                            paper_bgcolor: '#ffefcc',
                            plot_bgcolor: '#ffefcc',
                            xaxis: {
                                range: [-100, 100],
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

export default Lagrange;
