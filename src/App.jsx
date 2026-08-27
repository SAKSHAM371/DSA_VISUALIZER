import { useRef, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import VisualizerPage from "./pages/VisualizerPage";
import Login from "./pages/Login";
import DashboardHome from "./pages/DashboardHome";
import { linearSearch, binarySearch } from "./algorithms/sorting";



import {
  mergeSort, quickSort, radixSort, insertionSort, sleep,
  heapSort, shellSort, countingSort, bucketSort,
} from "./algorithms/sorting";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(60);
  const [isSorting, setIsSorting] = useState(false);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);

  const stopRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("isLoggedIn");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  const stopAlgorithm = () => {
    stopRef.current = true;
    setIsSorting(false);
    setComparingIndices([]);
  };

  const restartVisualization = () => {
    if (isSorting) return;
    if (originalArray.length === 0) return;
    setArray([...originalArray]);
    setSortedIndices([]);
    setComparingIndices([]);
  };

 const startAlgorithm = async (algo, target = null) => {
  if (isSorting) return;

  stopRef.current = false;
  setIsSorting(true);
  setSortedIndices([]);
  setComparingIndices([]);

  try {
    switch (algo) {
      // 🔽 SORTING ALGORITHMS
      case "bubble":
        await bubbleSort(array, setArray, speed, stopRef, setComparingIndices, setSortedIndices);
        break;

      case "selection":
        await selectionSort(array, setArray, speed, stopRef, setComparingIndices, setSortedIndices);
        break;

      case "insertion":
        await insertionSort(array, setArray, speed, stopRef, setComparingIndices, setSortedIndices);
        break;

      case "merge":
        await mergeSort(array, setArray, speed, stopRef, setComparingIndices, setSortedIndices);
        break;

      case "quick":
        await quickSort(array, setArray, speed, stopRef, setComparingIndices, setSortedIndices);
        break;

      case "radix":
        await radixSort(array, setArray, speed, stopRef);
        break;

      case "heap":
        await heapSort(array, setArray, speed, stopRef, setComparingIndices, setSortedIndices);
        break;

      // 🔍 SEARCHING ALGORITHMS (IMPORTANT PART)
      case "linear":
        if (target === null || isNaN(target)) {
          alert("Please enter a value to search!");
          break;
        }
        await linearSearch(
          array,
          target,
          setArray,
          speed,
          stopRef,
          setComparingIndices,
          setSortedIndices
        );
        break;

      case "binary":
        if (target === null || isNaN(target)) {
          alert("Please enter a value to search!");
          break;
        }
        await binarySearch(
          array,
          target,
          setArray,
          speed,
          stopRef,
          setComparingIndices,
          setSortedIndices
        );
        break;

      default:
        console.error("Unknown algorithm:", algo);
    }
  } catch (err) {
    console.error(err);
  }

  setIsSorting(false);
};


  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/" />;
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/visualizer/:type"
        element={
          <ProtectedRoute>
            <VisualizerPage
              array={array}
              setArray={setArray}
              size={size}
              setSize={setSize}
              startAlgorithm={startAlgorithm}
              stopAlgorithm={stopAlgorithm}
              restartVisualization={restartVisualization}
              isSorting={isSorting}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              speed={speed}
              setSpeed={setSpeed}
              comparingIndices={comparingIndices}
              sortedIndices={sortedIndices}
            />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
