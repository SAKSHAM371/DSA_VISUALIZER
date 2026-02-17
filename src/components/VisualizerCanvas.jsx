import { useEffect, useState } from "react";
import "../styles/index.css";

const VisualizerCanvas = () => {
  const [array, setArray] = useState([]);

  const generateArray = () => {
    let newArray = [];
    for (let i = 0; i < 30; i++) {
      newArray.push(Math.floor(Math.random() * 400) + 20);
    }
    setArray(newArray);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const resetArray = () => {
    generateArray();
  };

  const startSort = () => {
    alert("Sorting visualization will start here!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>DSA Visualizer</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={resetArray}>🔄 RESET</button>
        <button onClick={startSort} style={{ marginLeft: "10px" }}>
          ▶ START
        </button>
      </div>

      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default VisualizerCanvas;
