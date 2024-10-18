import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';

function Newtondivide() {
    const [n, setN] = useState(''); // จำนวน x
    const [x, setX] = useState(''); // ค่า x ตามจำนวน n
    const [y, setY] = useState(''); // ค่า y ตามจำนวน n
    const [mode, setMode] = useState(''); // linear, quadratic, polynomial
    const [xValue, setXValue] = useState(''); // ค่า x ที่ต้องการหาค่า y
    const [points, setPoints] = useState(''); // จุดที่ต้องการหา
    const [c, setC] = useState([]); // coefficients c0, c1, c2, ...
    const [output, setOutput] = useState(null); // ค่า y ที่หาได้จาก xValue
    const [graphData, setGraphData] = useState({ x: [], y: [] });

    const handleSolve = () => {
        if (n === '' || x === '' || y === '' || xValue === '' || mode === '') {
            alert("Please fill all input fields.");
            return;
        }

        const xArray = x.split(',').map(Number);
        const yArray = y.split(',').map(Number);
        const xValueNumber = Number(xValue);

        if (n != xArray.length || n != yArray.length) {
            alert("Invalid number of x or y values.");
            return;
        }

        // ตรวจสอบว่ามีการเลือก mode อย่างถูกต้อง
        let selectedX = [];
        let selectedY = [];

        if (mode === 'linear') {
            selectedX = xArray.slice(0, 2);
            selectedY = yArray.slice(0, 2);
        } else if (mode === 'quadratic') {
            selectedX = xArray.slice(0, 3);
            selectedY = yArray.slice(0, 3);
        } else if (mode === 'polynomial') {
            selectedX = xArray;
            selectedY = yArray;
        } else {
            alert("Invalid mode selected.");
            return;
        }

        // พิมพ์ค่าที่เลือกเพื่อดีบัก
        console.log("Selected X:", selectedX);
        console.log("Selected Y:", selectedY);
        console.log("X Value:", xValueNumber);

        const coefficients = calculateDividedDifferences(selectedX, selectedY);
        setC(coefficients); // Set c values

        const result = evaluateNewtonPolynomial(coefficients, selectedX, xValueNumber);
        setOutput(result);

        const graphX = Array.from({ length: 100 }, (_, i) => i - 50); // สร้างค่า x จาก -50 ถึง 49
        const graphY = graphX.map(val => evaluateNewtonPolynomial(coefficients, selectedX, val)); // คำนวณ y จากฟังก์ชัน

        setGraphData({ x: graphX, y: graphY }); // ตั้งค่าข้อมูลกราฟ
    };

    const calculateDividedDifferences = (xArray, yArray) => {
        const n = xArray.length;
        const table = Array.from({ length: n }, () => Array(n).fill(0));

        // Initialize first column with yArray values
        for (let i = 0; i < n; i++) {
            table[i][0] = yArray[i]; // f(xi) = yi
        }

        // Fill divided differences table
        for (let j = 1; j < n; j++) {
            for (let i = 0; i < n - j; i++) {
                table[i][j] = (table[i + 1][j - 1] - table[i][j - 1]) / (xArray[i + j] - xArray[i]);
            }
        }

        // Extract coefficients c0, c1, c2, ..., cn from the first row of the divided differences table
        const coefficients = table[0].slice(0, n);
        return coefficients;
    };
    // Function to evaluate Newton polynomial at xValue
    const evaluateNewtonPolynomial = (coefficients, xArray, xValue) => {
        let result = coefficients[0];
        let product = 1;

        for (let i = 1; i < coefficients.length; i++) {
            product *= (xValue - xArray[i - 1]);
            result += coefficients[i] * product;
        }

        return result;
    };

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold">Newton's divided-differences</h1>
                <p className="text-justify mt-2">
                    Newton's divided-differences interpolation is a method of polynomial interpolation and numerical analysis. Given a set of data points (x0, y0), (x1, y1), ..., (xn, yn), the goal is to find a polynomial that passes through all the points. The polynomial is constructed using a divided-differences table, which is a triangular table of coefficients. The polynomial can then be evaluated at any point x to find the corresponding y value.
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
                                <label className="block">Points</label>
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
                                <p>c : {c.length > 0 ? c.join(', ') : 'No data'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* graph plotกราฟจากฟังก์ชั่น f(x) = ตามสูตรของแต่ละประเภท (แต่ละประเภทฟังก์ชั่นต่างกัน)*/}
                <div className='w-full flex justify-center bg-base-100'>
                    <Plot
                        data={[{
                            x: graphData.x,
                            y: graphData.y,
                            type: 'scatter',
                            mode: 'lines',
                            marker: { color: 'black' },
                        }]}
                        layout={{
                            width: '100%',
                            height: 400,
                            title: 'Graph of Newton Polynomial',
                            paper_bgcolor: '#ffefcc',
                            plot_bgcolor: '#ffefcc',
                            xaxis: {
                                range: [-100, 100],
                            },
                            yaxis: {
                                range: [-100, 100],
                            },
                            margin: {
                                l: 40,
                                r: 40,
                                t: 40,
                                b: 40,
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Newtondivide;