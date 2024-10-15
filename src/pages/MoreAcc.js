import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function MoreAcc() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [fx, setFx] = useState('');
    const [h, setH] = useState('');
    const [x, setX] = useState('');
    const [mode, setMode] = useState('');
    const [order, setOrder] = useState(''); //ลำดับของอนุพันธ์

    const [output, setOutput] = useState(null);

    const handleSolve = () => {
        const parsedH = parseFloat(h);
        const parsedX = parseFloat(x);

        try {
            const f = math.compile(fx);
            const h = parsedH;
            const x = parsedX;

            if (order === '1') {
                if (mode === 'forward') {
                    const result = (-f.evaluate({ x: x + 2 * h }) + 4 * f.evaluate({ x: x + h }) - 3 * f.evaluate({ x: x })) / (2 * h);
                    setOutput(result);
                } else if (mode === 'backward') {
                    const result = (3 * f.evaluate({ x: x }) - 4 * f.evaluate({ x: x - h }) + f.evaluate({ x: x - 2 * h })) / (2 * h);
                    setOutput(result);
                } else if (mode === 'central') {
                    const result = (-f.evaluate({ x: x + 2*h }) + 8 * f.evaluate({ x: x + h }) - 8 * f.evaluate({ x: x - h }) + f.evaluate({x: x - 2*h})) / (12 * h);
                    setOutput(result);
                }
            } else if (order === '2') {
                if (mode === 'forward') {
                    const result = (-f.evaluate({ x: x + 3 * h }) + 4 * f.evaluate({ x: x + 2 * h }) - 5 * f.evaluate({ x: x + h }) + 2 * f.evaluate({ x: x })) / (h * h);
                    setOutput(result);
                } else if (mode === 'backward') {
                    const result = (2 * f.evaluate({ x: x }) - 5 * f.evaluate({ x: x - h }) + 4 * f.evaluate({ x: x - 2 * h }) - f.evaluate({ x: x - 3 * h })) / (h * h);
                    setOutput(result);
                } else if (mode === 'central') {
                    const result = (-f.evaluate({ x: x + 2 * h }) + 16 * f.evaluate({ x: x + h }) - 30 * f.evaluate({ x: x }) + 16 * f.evaluate({ x: x - h }) - f.evaluate({ x: x - 2 * h })) / (12 * h * h);
                    setOutput(result);
                }
            } else if (order === '3') {
                if (mode === 'forward') {
                    const result = (-3 * f.evaluate({ x: x + 4 * h }) + 14 * f.evaluate({ x: x + 3*h }) - 24 * f.evaluate({ x: x+2*h }) + 18 * f.evaluate({ x: x + h }) - 5 * f.evaluate({ x: x })) / (2 * (h * h * h));
                    setOutput(result);
                } else if (mode === 'backward') {
                    const result = (5 * f.evaluate({ x: x }) - 18 * f.evaluate({ x: x - h }) + 24 * f.evaluate({ x: x - 2 * h }) - 14 * f.evaluate({ x: x - 3 * h }) - f.evaluate({ x: x - 3 * h })) / (2 * (h * h * h));
                    setOutput(result);
                } else if (mode === 'central') {
                    const result = (-f.evaluate({ x: x + 3 * h }) + 8 * f.evaluate({ x: x + 2*h }) - 13 * f.evaluate({ x: x + h }) + 13 * f.evaluate({ x: x - h }) - 8 * f.evaluate({x: x - 2*h}) + f.evaluate({x: x-3*h})) / (8 * h * h * h);
                    setOutput(result);
                }
            } else if (order === '4') {
                if (mode === 'forward') {
                    const result = (-2 * f.evaluate({ x: x + 5 * h }) + 11 * f.evaluate({ x: x + 4 * h }) - 24 * f.evaluate({ x: x + 3 * h }) + 26 * f.evaluate({ x: x + 2 * h }) - 14 * f.evaluate({ x: x + h }) + 3 * f.evaluate({ x: x })) / (h * h * h * h);
                    setOutput(result);
                } else if (mode === 'backward') {
                    const result = (3 * f.evaluate({ x: x }) - 14 * f.evaluate({ x: x - h }) + 26 * f.evaluate({ x: x - 2 * h }) - 24 * f.evaluate({x: x - 3*h}) + 11 * f.evaluate({ x: x - 4 * h }) - 2 * f.evaluate({ x: x - 5 * h })) / (h * h * h * h);
                    setOutput(result);
                } else if (mode === 'central') {
                    const result = (-f.evaluate({ x: x + 3 * h }) + 12 * f.evaluate({ x: x + 2*h }) - 39 * f.evaluate({ x: x+h }) + 56 * f.evaluate({ x: x }) - 39 * f.evaluate({ x: x - h }) + 12 * f.evaluate({x: x-2*h}) - f.evaluate({x: x-3*h})) / (6 * h * h * h * h);
                    setOutput(result);
                }
            } else if (order > '4') {
                alert('Order must be 1,2,3,4');
            }

        } catch (e) {
            alert("There was an error evaluating the function. Please check your input function.");
            setOutput(null);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">More accurate derivatives</h1>
                <p className="text-justify mt-2">
                    In numerical analysis, the more accurate derivatives are useful for constructing interpolating polynomials. The more accurate derivatives are defined as follows
                </p>

                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className='flex flex-col w-full'>
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="flex gap-4">
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
                            <div className="mt-2 w-full">
                                <label className="block">select type</label>
                                <input
                                    type="text"
                                    placeholder='forward, backward, central'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">order</label>
                                <input
                                    type="text"
                                    placeholder='start with 1'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={order}
                                    onChange={(e) => setOrder(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">

                            <div className="mt-2 w-full">
                                <label className="block">x value</label>
                                <input
                                    type="text"
                                    placeholder='x'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={x}
                                    onChange={(e) => setX(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">h</label>
                                <input
                                    type="text"
                                    placeholder='h'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={h}
                                    onChange={(e) => setH(e.target.value)}
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

export default MoreAcc;
