import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import * as math from 'mathjs';

function CompositSimpson() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [a, setA] = useState(''); // Lower limit (a)
    const [b, setB] = useState(''); // Upper limit (b)
    const [fx, setFx] = useState(''); // Function input
    const [n, setN] = useState(''); // Number of subintervals

    const [output, setOutput] = useState(null);

    const handleSolve = () => {
        const parsedA = parseFloat(a);
        const parsedB = parseFloat(b);
        const parsedN = parseInt(n);

        if (isNaN(parsedA) || isNaN(parsedB) || isNaN(parsedN) || parsedN <= 0) {
            alert("Invalid input for lower limit (a), upper limit (b), or number of subintervals (n). Please enter valid numbers.");
            setOutput(null);
            return;
        }

        try {
            const f = math.compile(fx);

            // Check if n is even
            if (parsedN % 2 !== 0) {
                alert("N must be an even number for Simpson's Rule.");
                setOutput(null);
                return;
            }

            const h = (parsedB - parsedA) / (2*parsedN);
            console.log('h',h);
            let sum1 = f.evaluate({ x: parsedA }) + f.evaluate({ x: parsedB }); //f(x0) + f(xn)

            let xi = [];
            let parsedXi = [];
            for (let i = 1; i < parsedN; i++) {
                parsedXi[i] = parseFloat(xi.push(parsedA + (i * h)));
            }

            console.log('parsedXi',parsedXi.length);

            let fxi = [];
            for (let i = 0; i < parsedXi.length; i++) {
                fxi.push(f.evaluate({ x: parsedXi[i] }));
                console.log(fxi[i]);
            }

            let sum2 = 0;
            for (let i = 1; i < parsedN-1; i += 2) {
                sum2 += fxi[i];
            }

            let sum3 = 0;
            for (let i = 2; i < parsedN-2; i += 2) {
                sum3 += fxi[i];
            }

            const result = (h / 3) * (sum1 + (4 * sum2) + (2 * sum3));
            setOutput(result);
        } catch (e) {
            alert("There was an error evaluating the function. Please check your input function.");
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Composite Simpson's rule</h1>
                <p className="text-justify mt-2">
                    The composite Simpson's rule is a technique used to approximate the definite integral of a function.
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
                            <div className="mt-2 w-full">
                                <label className="block">Number of subintervals (n)</label>
                                <input
                                    type="text"
                                    placeholder='n'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={n}
                                    onChange={(e) => setN(e.target.value)}
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

export default CompositSimpson;
