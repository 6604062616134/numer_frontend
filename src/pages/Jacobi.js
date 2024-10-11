//มีตาราง แสดงerror
import React from 'react';
import Sidebar from '../components/Sidebar';

function Jacobi() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Jacobi iteration</h1>
                <p className="text-justify mt-2">
                    In numerical linear algebra, the Jacobi method is an iterative algorithm used to solve a system of linear equations. It is named after the German mathematician Carl Gustav Jacob Jacobi. The Jacobi method is similar to the Gauss–Seidel method, but it is not as efficient. The Jacobi method is used to solve systems of linear equations that are diagonally dominant, which means that the diagonal element of each row is larger than the sum of the absolute values of the other elements in the row. The Jacobi method is often used as a preconditioner for other iterative methods, such as the conjugate gradient method
                </p>

                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className="flex flex-col w-full">
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="">
                            <div className="mt-2 flex flex-row gap-4 justify-center">
                                <div>
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
                                </div>

                                <div>
                                    <label className="block">Array B</label>
                                    <div className="flex flex-col">
                                        <input type="text" placeholder="1" className="input input-bordered w-12 input-primary mt-2" />
                                        <input type="text" placeholder="2" className="input input-bordered w-12 input-primary mt-2" />
                                        <input type="text" placeholder="3" className="input input-bordered w-12 input-primary mt-2" />
                                    </div>
                                </div>

                            </div>

                            <div className="my-4">
                                <div className="flex gap-2 flex flex-row justify-center">
                                    <button className="btn btn-ghost btn-sm">+</button>
                                    <button className="btn btn-ghost btn-sm">-</button>
                                </div>
                            </div>

                            <div className='flex flex-row justify-center w-full'>
                                <button className="btn btn-primary w-1/3">Solve</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-4">
                            <h2 className="text-xl font-semibold">Output</h2>
                            <div className="flex flex-row justify-center gap-4">
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

export default Jacobi;