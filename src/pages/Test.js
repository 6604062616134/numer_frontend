import React from 'react';
import Plot from 'react-plotly.js';

const Test = () => {
  // ฟังก์ชันที่เราต้องการกราฟ
  const f = (x) => 2*x-5; // เช่น y = x^2

  // สร้างข้อมูลสำหรับกราฟ
  const xValues = Array.from({ length: 100 }, (_, i) => i - 50); // x จาก -50 ถึง 49
  const yValues = xValues.map(f); // คำนวณ y จาก x

  return (
    <Plot
      data={[
        {
          x: xValues,
          y: yValues,
          type: 'scatter',
          mode: 'lines',
          marker: { color: 'blue' },
        },
      ]}
      layout={{ width: 600, height: 400, title: 'Graph of y = x^2' }}
    />
  );
};

export default Test;
