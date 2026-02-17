import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function Dashboard({
  array,
  setArray,
  startAlgorithm,
  stopAlgorithm,
  restartVisualization,
  isSorting,
  algorithm,
  setAlgorithm,
  comparingIndices,
  sortedIndices,
}) {
  const navigate = useNavigate();
  const { type } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 MAIN FINAL FIX (FORCE SYNC WITH URL)
  useEffect(() => {
    if (type && type !== algorithm) {
      setAlgorithm(type);
      setArray([]); // reset old array when switching algorithm
    }
  }, [type,setAlgorithm,setArray]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const formatAlgoName = (algo) => {
    const map = {
      bubble: "Bubble Sort",
      insertion: "Insertion Sort",
      selection: "Selection Sort",
      merge: "Merge Sort",
      quick: "Quick Sort",
      heap: "Heap Sort",
      shell: "Shell Sort",
      counting: "Counting Sort",
      bucket: "Bucket Sort",
      radix: "Radix Sort",
      linear: "Linear Search",
      binary: "Binary Search",
    };
    return map[algo] || "Algorithm";
  };

  const generateArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setArray(newArr);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", padding: "20px", color: "white" }}>
      {/* NAVBAR */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>🚀 DSA Visualizer</h2>
        <div>
          Hi, {user?.name || "User"} 👋
          <button
            onClick={handleLogout}
            style={{ marginLeft: "15px", padding: "6px 12px", background: "red", color: "white", border: "none", borderRadius: "6px" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 DYNAMIC TITLE (NOW ALWAYS CORRECT) */}
      <h1 style={{ textAlign: "center", marginBottom: "25px", color: "#38bdf8" }}>
        🚀 {formatAlgoName(type)} Visualizer
      </h1>

      {/* CONTROLS */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={generateArray} disabled={isSorting} style={{ margin: "10px", padding: "10px 20px" }}>
          Generate Array
        </button>

      <button 
  onClick={() => startAlgorithm(type)} 
  disabled={isSorting}
>
  Start
</button>

        <button onClick={restartVisualization} style={{ margin: "10px", padding: "10px 20px" }}>
          Again
        </button>

        <button onClick={stopAlgorithm} style={{ margin: "10px", padding: "10px 20px" }}>
          Stop
        </button>
      </div>

      {/* BARS */}
      <div
        style={{
          height: "420px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "5px",
          background: "#020617",
          border: "1px solid #1e293b",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        {array.length === 0 ? (
          <p>Click Generate Array to start visualization</p>
        ) : (
          array.map((value, index) => (
            <div
              key={index}
              style={{
                width: "15px",
                height: `${value * 3}px`,
                background: comparingIndices.includes(index)
                  ? "red"
                  : sortedIndices.includes(index)
                  ? "green"
                  : "#3b82f6",
                borderRadius: "4px",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
