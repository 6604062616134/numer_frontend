import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function Higher() {
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

            if (order === '2') {
                if (mode === 'forward') {
                    const result = (f.evaluate({ x: x + 2*h }) - 2 * f.evaluate({ x: x + h }) + f.evaluate({ x: x })) / (h * h);
                    setOutput(result);
                } else if (mode === 'backward') {
                    const result = (f.evaluate({ x: x }) - 2 * f.evaluate({ x: x-h }) + f.evaluate({ x: x - 2*h })) / (h * h);
                    setOutput(result);
                } else if (mode === 'central') {
                    const result = (f.evaluate({ x: x + h }) - 2 * f.evaluate({ x: x }) + f.evaluate({ x: x - h })) / (h * h);
                    setOutput(result);
                }

                console.log('x+h', f.evaluate({ x: x + h }));
                console.log('2fx', 2*f.evaluate({ x: x }));
                console.log('x-h', f.evaluate({ x: x - h }));
            }else if(order === '3'){
                if (mode === 'forward') {
                    const result = (f.evaluate({ x: x + 3*h }) - 3 * f.evaluate({ x: x + 2*h }) + 3 * f.evaluate({ x: x + h }) - f.evaluate({ x: x })) / (h * h * h);
                    setOutput(result);
                } else if (mode === 'backward') {
                    const result = (f.evaluate({ x: x }) - 3 * f.evaluate({ x: x-h }) + 3 * f.evaluate({ x: x-2*h }) - f.evaluate({ x: x - 3*h })) / (h * h * h);
                    setOutput(result);
                } else if (mode === 'central') {
                    const result = (f.evaluate({ x: x + 2*h }) - 2 * f.evaluate({ x: x + h }) + 2 * f.evaluate({ x: x - h }) - f.evaluate({x: x - 2*h})) / (2 * (h * h * h));
                    setOutput(result);
                }
            }else if(order === '4'){
                if (mode === 'forward') {
                    const result = (f.evaluate({ x: x + 4*h }) - 4 * f.evaluate({ x: x + 3*h }) + 6 * f.evaluate({ x: x + 2*h }) - 4 * f.evaluate({ x: x + h }) + f.evaluate({ x: x })) / (h * h * h * h);
                    setOutput(result);
                } else if (mode === 'backward') {
                    const result = (f.evaluate({ x: x }) - 4 * f.evaluate({ x: x-h }) + 6 * f.evaluate({ x: x-2*h }) - 4 * f.evaluate({ x: x-3*h }) + f.evaluate({ x: x - 4*h })) / (h * h * h * h);
                    setOutput(result);
                } else if (mode === 'central') {
                    const result = (f.evaluate({ x: x + 2*h }) - 4 * f.evaluate({ x: x + h }) + 6 * f.evaluate({ x: x }) - 4 * f.evaluate({ x: x - h }) + f.evaluate({x: x - 2*h})) / (h * h * h * h);
                    setOutput(result);
                }
            }else if(order > '4'){
                alert('Order must be 2,3,4');
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
                <h1 className="text-3xl font-bold">Higher derivatives</h1>
                <p className="text-justify mt-2">
                    In calculus, the derivative of a function of a real variable measures the sensitivity to change of the function value (output value) with respect to a change in its argument (input value). Derivatives are a fundamental tool of calculus. For example, the derivative of the position of a moving object with respect to time is the object's velocity: this measures how quickly the position of the object changes when time is varied. The derivative of a function of a single variable at a chosen input value, when it exists, is the slope of the tangent line to the graph of the function at that point. The tangent line is the best linear approximation of the function near that input value. For this reason, the derivative is often described as the "instantaneous rate of change", the ratio of the instantaneous change in the dependent variable to that of the independent variable
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
                                    placeholder='start with 2'
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

export default Higher;
