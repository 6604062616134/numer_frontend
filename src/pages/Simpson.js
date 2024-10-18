import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';
import Plot from 'react-plotly.js';

function Simpson() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [a, setA] = useState(''); // Lower limit (a)
    const [b, setB] = useState(''); // Upper limit (b)
    const [fx, setFx] = useState(''); // Function input

    const [output, setOutput] = useState(null);
    const [h, setH] = useState(null);
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);

    const handleSolve = () => {
        const parsedA = parseFloat(a);
        const parsedB = parseFloat(b);

        if (isNaN(parsedA) || isNaN(parsedB)) {
            alert("Invalid input for lower limit (a) or upper limit (b). Please enter valid numbers.");
            setOutput(null);
            return;
        }

        try {
            console.log("fx -> ", fx);
            const formattedFx = fx.replace(/(\d)(x)/g, '$1*$2');

            const f = math.compile(formattedFx);
            const h = (parsedB - parsedA) / 2;
            setH(h);
            const mid = (parsedA + parsedB) / 2;
            const sum = f.evaluate({ x: parsedA }) + 4 * f.evaluate({ x: mid }) + f.evaluate({ x: parsedB }); //f(x) = f(x0) + 4f(x1) + f(x2)

            const result = (h / 3) * sum;
            setOutput(result);

             // Generate x and y values for the graph
             const xValues = [];
             const yValues = [];
             for (let x = parsedA; x <= parsedB; x += 0.1) {
                 xValues.push(x);
                 yValues.push(f.evaluate({ x }));
             }
             setXValues(xValues);
             setYValues(yValues);

        } catch (e) {
            alert("There was an error evaluating the function. Please check your input function.");
            setOutput(null);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Simpson's rule</h1>
                <p className="text-justify mt-2">
                    Simpson's rule is a technique used to approximate the definite integral of a function with 2 subintervals.
                </p>

                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className='flex flex-col w-full'>
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="flex gap-4">
                            <div className="mt-2 w-full">
                                <label className="block">Lower limit (a)</label>
                                <input
                                    type="text"
                                    placeholder='a'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={a}
                                    onChange={(e) => setA(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">Upper limit (b)</label>
                                <input
                                    type="text"
                                    placeholder='b'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={b}
                                    onChange={(e) => setB(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="mt-2 w-full">
                                <label className="block">Function</label>
                                <input
                                    type="text"
                                    placeholder='f(x)'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={fx}
                                    onChange={(e) => setFx(e.target.value)}
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
                                <p>h : {h !== null ? h : 'No data'}</p>
                            </div>
                        </div>
                        <div className='w-full flex justify-center bg-base-100'>
                            <Plot
                                data={[
                                    {
                                        x: xValues,
                                        y: yValues,
                                        type: 'scatter',
                                        mode: 'lines',
                                        marker: { color: 'black' },
                                    },
                                ]}
                                layout={{
                                    width: '100%',
                                    height: 400,
                                    title: fx ? `Graph of ${fx}` : 'Graph',
                                    paper_bgcolor: '#ffefcc',
                                    plot_bgcolor: '#ffefcc',
                                    xaxis: {
                                        range: [parseFloat(a), parseFloat(b)],
                                    },
                                    yaxis: {
                                        range: [-10, 10],
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
        </div>
    );
}

export default Simpson;
