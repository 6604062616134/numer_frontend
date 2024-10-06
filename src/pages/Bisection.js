import React from 'react';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

function Bisection() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Bisection Method</h1>
        <p className="text-justify mt-2">
          The bisection method is a root-finding method that applies to any continuous function for which one knows two values with opposite signs. The method consists of repeatedly bisecting the interval defined by these values and then selecting the subinterval in which the function changes sign, and therefore must contain a root.
        </p>

        {/*input & table section*/}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className='flex flex-col w-full'>
            <h2 className="text-xl font-semibold">Input</h2>

            <div className="flex gap-4">
              <div className="mt-2 w-full">
                <label className="block">xL</label>
                <input type="text" placeholder='0' className="input input-bordered w-full input-primary mt-2" />
              </div>
              <div className="mt-2 w-full">
                <label className="block">xR</label>
                <input type="text" placeholder='10' className="input input-bordered w-full input-primary mt-2" />
              </div>
            </div>

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

export default Bisection;