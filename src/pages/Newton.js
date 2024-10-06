import React from 'react';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

function Newton() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Newton-raphson method</h1>
        <p className="text-justify mt-2">
            The Newton-Raphson method is a root-finding algorithm that uses a succession of roots of secant lines combined with bisection method to approximate a root of a function f. The method is also known as regula falsi, the Latin for false
        </p>

        {/*input & table section*/}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className='flex flex-col w-full'>
            <h2 className="text-xl font-semibold">Input</h2>

            <div className="flex gap-4 w-full">
              <div className="mt-2">
                <label className="block">Roots</label>
                <input type="text" placeholder='roots' className="input input-bordered w-full input-primary mt-2" />
              </div>

              <div className="mt-2">
                <label className="block">Number</label>
                <input type="text" placeholder='number' className="input input-bordered w-full input-primary mt-2" />
              </div>

              <div className="mt-2">
                <label className="block">Epsilon</label>
                <input type="text" placeholder='0.00001' className="input input-bordered w-full input-primary mt-2" />
              </div>

              <div className="mt-2">
                <label className="block">x start</label>
                <input type="text" placeholder='x0' className="input input-bordered w-full input-primary mt-2" />
              </div>
            </div>


            <div className="mt-6">
              <button className="btn btn-primary btn-block">Solve</button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-semibold">Output Table</h2>

            <Table />
          </div>
        </div>

        {/*graph section*/}

      </div>
    </div>
  );
}

export default Newton;