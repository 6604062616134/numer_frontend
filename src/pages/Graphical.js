import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Plot from 'react-plotly.js';
import axios from 'axios';

function Graphical() {
  // ตัวแปรเก็บอินพุทจากช่องอินพุท
  const [xStart, setXStart] = useState('');
  const [xEnd, setXEnd] = useState('');
  const [func, setFunc] = useState('');
  const [step, setStep] = useState('');
  const [outputData, setOutputData] = useState({ iteration: [], answer_y: [], answer_x: null, message: 'No Data' }); // State สำหรับเก็บข้อมูล output
  const [arr, setArr] = useState([]); // State สำหรับเก็บข้อมูล arr ที่จะใช้ในตาราง
  const [lengthTable, setLengthTable] = useState(0); // State สำหรับเก็บ length_table

  const [modifiedFunc, setModifiedFunc] = useState(''); // สร้าง state สำหรับเก็บ func ที่ถูกแทนที่ 'e' แล้ว

  const [exercise, setExercise] = useState([]);
  useEffect(() => {
    // ฟังก์ชันที่จะทำงานเมื่อ component ถูกโหลด
    // ใช้สำหรับการดึงข้อมูลจาก API
    // ตัวอย่างการใช้งาน
    axios.get('http://localhost:8000/get-exercise', {
      params: {
        category: 'graphical'
      }
    }).then(response => {
      setExercise(response.data);
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }, []);

  const getExcercise = async () => {
    if (exercise.length === 0) {
      alert("No exercise data");
      return;
    }
    const randomIndex = Math.floor(Math.random() * exercise.length);
    const randomExercise = exercise[randomIndex];
    setXStart(randomExercise.exercise.xStart);
    setXEnd(randomExercise.exercise.xEnd);
    setFunc(randomExercise.exercise.Function);
    setStep(randomExercise.exercise.Step);
  };

  const handleSolve = async () => {
     if (xStart === "" || xEnd === "" || func === "" || step === "") {
      alert("Please fill all input fields.");
      return;
    }

    const xStartNum = parseFloat(xStart);
    const xEndNum = parseFloat(xEnd);
    const stepNum = parseFloat(step);

    const e = 2.71828; // ค่าคงที่ e

    // แทนที่ 'e' ด้วยค่าที่กำหนด
    let modifiedFunc2 = func.replace(/e/g, e);
    setModifiedFunc(modifiedFunc2);

    // ใช้ pattern ที่ปรับแล้วสำหรับการจับค่า
    const pattern = /([0-9.]+|\-?\d+)/g
    const terms = modifiedFunc2.match(pattern);

    if (!terms || terms.length < 2) {
      alert("Invalid function format. Please enter a valid function.");
      return;
    }

    // แปลงค่า term เป็นตัวเลข
    const num1 = parseFloat(terms[0]);
    const num2 = parseFloat(terms[1]);

    let y0 = 0;
    let y1 = 0;
    let y2 = 0;
    let found = false;
    let lower, upper;
    let epsilon = 0.0001;

    let iteration = [];
    let answer_y = [];
    let answer_x = null;

    for (let i = xStartNum; i <= xEndNum; i++) {
      y0 = num1 * i + num2;
      y1 = num1 * (i + 1) + num2;

      if (y0 * y1 < 0) {
        found = true;
        lower = i;
        upper = i + 1;
        break;
      }
    }

    if (found) {
      for (let j = lower; j <= upper; j += stepNum) {
        y2 = num1 * (j + stepNum) + num2;

        iteration.push(j);
        answer_y.push(y2);

        if ((y2 < epsilon && y2 > 0) || y2 === 0) {
          answer_x = j;
          setOutputData({ iteration, answer_y, answer_x });

          let length_table = answer_y.length > 20 ? answer_y.length - 20 : 0;
          let slicedArr = answer_y.slice(length_table);

          setArr(slicedArr);  // เก็บค่า arr ไว้ใน state
          setLengthTable(length_table);  // เก็บค่า length_table ไว้ใน state

          console.log(slicedArr);
          return;
        }
      }
      setOutputData({ message: "No root found with this position" });
      setArr([]);  // ถ้าไม่มี root ให้เคลียร์ arr
    } else {
      setOutputData({ message: "No root found in this range" });
      setArr([]);  // ถ้าไม่มี root
    }
  };

  const xRange = 100;

  const calculateY = (x, eq) => {
    try {
      // ใช้ eval และแทนที่ 'x' ในสมการ
      return eval(eq.replace(/x/g, x));
    } catch (error) {
      console.error('Error evaluating the equation:', error);
      return null; // คืนค่า null ถ้าเกิดข้อผิดพลาด
    }
  };

  // สร้างข้อมูลสำหรับกราฟ
  const xValues = Array.from({ length: 201 }, (_, i) => i - xRange); // x จาก -100 ถึง 100
  const yValues = xValues.map(x => calculateY(x, modifiedFunc)); // คำนวณ y จาก x

  //เอาบรรทัดนี้ บรรทัด sidebar และบรรทัดต่อจาก sidebar ไปใส่ไฟล์อื่นด้วย 
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar onToggle={(collapsed) => setIsCollapsed(collapsed)} />
      <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="flex-1 p-6">

          <h1 className="text-3xl font-bold">Graphical Method</h1>
          <p className="text-justify mt-2">
            The graphical method is a simple method used to solve linear programming problems. It is used to represent the feasible region graphically and find the optimal solution.
          </p>

          <div className="flex flex-col lg:flex-row mt-6 gap-6">
            <div className='flex flex-col w-full'>
              <h2 className="text-xl font-semibold">Input</h2>

              <div className="flex gap-4">
                <div className="mt-2 w-full">
                  <label className="block">xStart</label>
                  <input
                    type="text"
                    placeholder='0'
                    className="input input-bordered w-full input-primary mt-2"
                    value={xStart}
                    onChange={(e) => setXStart(e.target.value)}
                  />
                </div>

                <div className="mt-2 w-full">
                  <label className="block">xEnd</label>
                  <input
                    type="text"
                    placeholder='10'
                    className="input input-bordered w-full input-primary mt-2"
                    value={xEnd}
                    onChange={(e) => setXEnd(e.target.value)}
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
                    value={func}
                    onChange={(e) => setFunc(e.target.value)}
                  />
                </div>

                <div className="mt-2 w-full">
                  <label className="block">Step</label>
                  <input
                    type="text"
                    placeholder='0.00001'
                    className="input input-bordered w-full input-primary mt-2"
                    value={step}
                    onChange={(e) => setStep(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="btn btn-primary btn-block" onClick={handleSolve}>
                  Solve
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold">Output</h2> 
                <button onClick={getExcercise} className="btn btn-primary w-1/8" >Exercise</button>
              </div>
              <div className="text-lg">
                <p>Answer : {outputData.answer_x ? outputData.answer_x : outputData.message}</p>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <h2 className="text-xl font-semibold">Output Table</h2>
                {/* table */}
                <div className="h-80 overflow-x-auto rounded mt-2">
                  <table className="table table-pin-rows rounded">
                    <thead>
                      <tr>
                        <th className="bg-primary text-primary-content">Iteration</th>
                        <th className="bg-primary text-primary-content">Y Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arr.length > 0 ? (
                        arr.map((yValue, index) => (
                          <tr key={index}>
                            <td>{outputData.iteration[lengthTable + index]}</td> {/* ใช้ index ที่สอดคล้องกับการ slice */}
                            <td>{yValue}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="text-center">No data</td>
                        </tr>
                      )}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* graph */}
        <div className='w-full flex justify-center bg-base-100'>
          <Plot
            data={[
              {
                x: xValues,
                y: yValues,
                type: 'linear',
                mode: 'lines',
                marker: { color: 'black' },
              },
            ]}
            layout={{
              width: '100%', // กำหนดให้กราฟมีความกว้าง 100%
              height: 400,
              title: func ? `Graph of ${func}` : 'Graph', // แสดงชื่อกราฟตาม func
              paper_bgcolor: '#ffefcc', // เปลี่ยนสีพื้นหลังของกราฟ
              plot_bgcolor: '#ffefcc', // เปลี่ยนสีพื้นหลังของพื้นที่กราฟ
              xaxis: {
                // showline: false,
                // zeroline: false,
                // ticks: '',
                // title: '',
                range: [-90, 90], // Set the initial zoom level for x-axis
              },
              yaxis: {
                // title: 'Y-axis Title',
                // autorange: true,
                // automargin: true,
                range: [-100, 100], // Set the initial zoom level for y-axis
              },
              margin: {
                l: 40, // ระยะห่างด้านซ้าย
                r: 40, // ระยะห่างด้านขวา
                t: 40, // ระยะห่างด้านบน
                b: 40, // ระยะห่างด้านล่าง
                pad: 0, // ระยะห่างภายใน
              },
            }}
            config={{ responsive: true }} // ทำให้กราฟตอบสนองต่อการเปลี่ยนแปลงขนาดหน้าต่าง
          />
        </div>
      </div>
    </div>
  );
}

export default Graphical;
