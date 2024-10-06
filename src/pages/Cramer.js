import React from 'react';
import Sidebar from '../components/Sidebar';

function Cramer() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Cramer's rule</h1>
                <p className="text-justify mt-2">
                    In linear algebra, Cramer's rule is an explicit formula for the solution of a system of linear equations with as many equations as unknowns, valid whenever the system has a unique solution. It is named after Gabriel Cramer (1704–1752), who published the rule for an arbitrary number of unknowns in 1750, although Colin Maclaurin also published special cases of the rule in 1748, and it is even older in the special case of 2 equations.
                </p>

                {/* input & table section */}
                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className="flex flex-col w-full">
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="flex gap-4" >
                            <div className="mt-2 flex flex-col">
                                <label className="block">Array A</label>
                                <div className="flex gap-1">
                                    <input type="text" placeholder='1' className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder='2' className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder='3' className="input input-bordered w-12 input-primary mt-2" />
                                </div>
                                <div className="flex gap-1">
                                    <input type="text" placeholder='4' className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder='5' className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder='6' className="input input-bordered w-12 input-primary mt-2" />
                                </div>
                                <div className="flex gap-1">
                                    <input type="text" placeholder='7' className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder='8' className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder='9' className="input input-bordered w-12 input-primary mt-2" />
                                </div>

                                <label className="block mt-4">Array B</label>
                                <div className="flex flex-col gap-1">
                                    <input type="text" placeholder="1" className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder="2" className="input input-bordered w-12 input-primary mt-2" />
                                    <input type="text" placeholder="3" className="input input-bordered w-12 input-primary mt-2" />
                                </div>
                                <div className="mt-2">
                                    <div className="flex gap-2 flex flex-row">
                                        <button className="btn btn-ghost btn-sm">+</button>
                                        <button className="btn btn-ghost btn-sm">-</button>
                                    </div>
                                    <button className="btn btn-primary btn-block">Solve</button>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold">Output</h2>
                            <div className="flex gap-4">
                                <div className="mt-2">
                                    <label className="block">x1</label>
                                    <input type="text" placeholder='0' className="input input-bordered w-20 input-primary mt-2" />
                                </div>
                                <div className="mt-2">
                                    <label className="block">x2</label>
                                    <input type="text" placeholder='0' className="input input-bordered w-20 input-primary mt-2" />
                                </div>
                                <div className="mt-2">
                                    <label className="block">x3</label>
                                    <input type="text" placeholder='0' className="input input-bordered w-20 input-primary mt-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* graph section */}
            </div>
        </div>
    );
}

export default Cramer;
