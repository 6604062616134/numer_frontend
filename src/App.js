import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hello-world');
        console.log(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }

    // const fetchData2 = async () => {

    // }

    fetchData();
  });

  const [inputValueA, setInputValueA] = useState("");
  const [inputValueB, setInputValueB] = useState("");

  const [result, setResult] = useState("");

  const handleChange = (e,mode) => {
    if(mode === "A"){
      setInputValueA(e.target.value);
    } else {
      setInputValueB(e.target.value);
    }
  }

  const sendData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/cal', {
        "a": inputValueA,
        "b": inputValueB,
        "mode": "add"
      });
      
      if(response.status === 200){
        setInputValueA("");
        setInputValueB("");
        
        setResult(response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='main-container'>
      <Navbar />
      <div>
        <input onChange={(e) => handleChange(e,"A")} value={inputValueA} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <input onChange={(e) => handleChange(e,"B")} value={inputValueB} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mt-4" />
        <button onClick={sendData} className="btn btn-primary mt-4">Primary</button>

        <div className="mt-4">
          <p>Result: {result}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
