import React from 'react';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

function Graphical() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Graphical Method</h1>
        <p className="text-justify mt-2">
          The graphical method is a simple method used to solve linear programming problems. It is used to represent the feasible region graphically and find the optimal solution.
        </p>

        {/*input & table section*/}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className='flex flex-col w-full'>
            <h2 className="text-xl font-semibold">Input</h2>

            <div className="flex gap-4">
              <div className="mt-2 w-full">
                <label className="block">xStart</label>
                <input type="text" placeholder='0' className="input input-bordered w-full input-primary mt-2" />
              </div>
              <div className="mt-2 w-full">
                <label className="block">xEnd</label>
                <input type="text" placeholder='10' className="input input-bordered w-full input-primary mt-2" />
              </div>
            </div>

            <div className="mt-2">
              <label className="block">Objective Function</label>
              <input type="text" placeholder='43x-180' className="input input-bordered w-full input-primary mt-2" />
            </div>

            <div className="mt-2">
              <label className="block">Step</label>
              <input type="text" placeholder='0.00001' className="input input-bordered w-full input-primary mt-2" />
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

export default Graphical;