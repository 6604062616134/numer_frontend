import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function Lagrange() {
    const [n, setN] = useState(''); //จำนวน x
    const [x, setX] = useState(''); //ค่า x ตามจำนวน n
    const [y, setY] = useState(''); //ค่า y ตามจำนวน n
    const [mode, setMode] = useState(''); //linear qaud poly 
    const [xValue, setXValue] = useState(''); //ค่า x ที่ต้องการหาค่า y
    const [points, setPoints] = useState([]); //จุดที่ต้องการหา
    const [l, setL] = useState([]);

    const [output, setOutput] = useState(null); //ค่า y ที่หาได้ จาก xValue

    //จำนวนจุดที่ต้องการจะหา linear(2จุด) quad(3จุด) poly(5จุด) fixจำนวนจุดไปเลย
    const handleSolve = async () => {
        if (mode === '' || n === '' || x === '' || y === '' || xValue === '' || points.length === 0) {
            alert("Please fill all input fields.");
            return;
        }

        // แปลงสตริง x, y เป็นแอร์เรย์
        const xArray = x.split(',').map(Number);
        const yArray = y.split(',').map(Number);
        const pointsArray = points.split(',').map(Number).map(i => i - 1); // แปลง points เป็นแอร์เรย์และปรับให้เริ่มจาก 0

        // ตรวจสอบขนาดของแอร์เรย์
        if (n != xArray.length || n != yArray.length) {
            alert("Invalid number of x or y.");
            return;
        }

        // ตรวจสอบ index ที่ได้จาก pointsArray ว่าถูกต้องหรือไม่
        let validPoints = true;
        for (let i = 0; i < pointsArray.length; i++) {
            if (pointsArray[i] < 0 || pointsArray[i] >= xArray.length) {
                validPoints = false;
                alert(`Invalid point index at position ${i}.`);
                break;
            }
        }
        if (!validPoints) return;

        // เลือกจุด f(xi) จาก points ที่กรอกมาเพื่อนำไปคำนวณ
        let selectedPointsX = pointsArray.map(i => xArray[i]);
        let selectedPointsY = pointsArray.map(i => yArray[i]);

        console.log("Selected X:", selectedPointsX);
        console.log("Selected Y:", selectedPointsY);

        let result = 0;

        if (mode === 'linear') {
            result = linearInterpolation(selectedPointsX, selectedPointsY, xValue);
        } else if (mode === 'quadratic') {
            result = quadraticInterpolation(selectedPointsX, selectedPointsY, xValue);
        } else if (mode === 'polynomial') {
            result = polynomialInterpolation(selectedPointsX, selectedPointsY, xValue);
        }

        console.log("Result:", result);
        setOutput(result);
    };

    const linearInterpolation = (x, y, xValue) => {
        let result = 0;
        let L0 = (x[1] - xValue) / (x[1] - x[0]);
        let L1 = (x[0] - xValue) / (x[0] - x[1]);

        setL([L0, L1]); // Set ค่า Lagrange basis polynomials

        result = L0 * y[0] + L1 * y[1];
        return result;
    }

    const quadraticInterpolation = (x, y, xValue) => {
        let result = 0;
        let L0 = ((x[2] - xValue) * (x[1] - xValue)) / ((x[2] - x[0]) * (x[1] - x[0]));
        let L1 = ((x[2] - xValue) * (x[0] - xValue)) / ((x[2] - x[1]) * (x[0] - x[1]));
        let L2 = ((x[1] - xValue) * (x[0] - xValue)) / ((x[1] - x[2]) * (x[0] - x[2]));

        setL([L0, L1, L2]); // Set ค่า Lagrange basis polynomials

        result = L0 * y[0] + L1 * y[1] + L2 * y[2];
        return result;
    }

    const polynomialInterpolation = (x, y, xValue) => {
        let result = 0;
        let lagrangeBasis = [];

        // Iterate through each point
        for (let i = 0; i < x.length; i++) {
            let Li = 1; // Initialize Lagrange basis polynomial for point i

            // Compute the Lagrange basis polynomial L_i(x)
            for (let j = 0; j < x.length; j++) {
                if (i !== j) {
                    Li *= (xValue - x[j]) / (x[i] - x[j]);
                }
            }

            lagrangeBasis.push(Li); // Store L_i for display

            // Add the contribution of L_i(x) * y_i to the result
            result += Li * y[i];
        }

        setL(lagrangeBasis); // Set ค่า Lagrange basis polynomials
        return result;
    };


    console.log(output);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Lagrange interpolation</h1>
                <p className="text-justify mt-2">
                    The Lagrange interpolation is a method of finding a polynomial that passes through a set of points.
                </p>

                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className='flex flex-col w-full'>
                        <h2 className="text-xl font-semibold">Input</h2>

                        <div className="flex gap-4">
                            <div className="mt-2 w-full">
                                <label className="block">Number of initial x,y value(n)</label>
                                <input
                                    type="text"
                                    placeholder='(n value)'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={n}
                                    onChange={(e) => setN(e.target.value)}
                                />
                            </div>
                            {/* x value, y value(state x,y) รับเป็นarray อินพุทในช่องเดียว ใส่ลูกน้ำคั่น*/}
                            <div className="mt-2 w-full">
                                <label className="block">X value</label>
                                <input
                                    type="text"
                                    placeholder='(n value)'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={x}
                                    onChange={(e) => setX(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 w-full">
                                <label className="block">Y value</label>
                                <input
                                    type="text"
                                    placeholder='(n value)'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={y}
                                    onChange={(e) => setY(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* เลือกประเภท */}
                        <div className="flex gap-4 w-full">
                            <div className="mt-2 w-full">
                                <label className="block">Select type</label>
                                <input
                                    type="text"
                                    placeholder='linear, quadratic, polynomial'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                />
                            </div>
                            {/* ใส่ค่า x ที่ต้องการหาค่า y ไม่เป็นแอร์เรย์*/}
                            <div className="mt-2 w-full">
                                <label className="block">X</label>
                                <input
                                    type="text"
                                    placeholder='Input x value to find y value'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={xValue}
                                    onChange={(e) => setXValue(e.target.value)}
                                />
                            </div>
                            {/* จุดที่ต้องการจะหา ไม่เป็นแอร์เรย์*/}
                            <div className="mt-2 w-full">
                                <label className="block">Points(start with 0)</label>
                                <input
                                    type="text"
                                    placeholder='eg. linear=1,2/ quad=1,2,3/ poly=1,2,3,4,5'
                                    className="input input-bordered w-full input-primary mt-2"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
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
                                <p>Answer : {output ? output : 'No data'}</p>
                                <p>L : {l ? l.join(', ') : 'No data'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* graph */}
            </div>
        </div>
    );
}

export default Lagrange;