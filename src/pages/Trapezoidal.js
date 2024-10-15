import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function Trapezoidal() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [x0, setX0] = useState(''); // Lower limit (a)
    const [x1, setX1] = useState(''); // Upper limit (b)
    const [fx, setFx] = useState(''); // Function input

    const [output, setOutput] = useState(null);

    const handleSolve = () => {
        const parsedX0 = parseFloat(x0);
        const parsedX1 = parseFloat(x1);

        if (isNaN(parsedX0) || isNaN(parsedX1)) {
            alert("Invalid input for lower limit (a) or upper limit (b). Please enter valid numbers.");
            setOutput(null);
            return;
        }

        try {
            const formattedFx = fx.replace(/(\d)(x)/g, '$1*$2');

            console.log("formattedFx -> ", formattedFx);
            const f = math.compile(formattedFx);
            const h = parsedX1 - parsedX0;
            const sum = f.evaluate({ x: parsedX0 }) + f.evaluate({ x: parsedX1 }); //f(x) = f(x0) + f(x1)

            const result = (h/2) * sum;
            setOutput(result);
        } catch (e) {
            alert("There was an error evaluating the function. Please check your input function.");
            setOutput(null);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Trapezoidal rule</h1>
                <p className="text-justify mt-2">
                    The trapezoidal rule is a technique used to approximate the definite integral of a function with 2 subintervals.
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
                                    value={x0}
                                    onChange={(e) => setX0(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">Upper limit (b)</label>
                                <input
                                    type="text"
                                    placeholder='b'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={x1}
                                    onChange={(e) => setX1(e.target.value)}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trapezoidal;
