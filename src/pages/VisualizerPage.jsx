import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import algorithmComplexity from "../data/algorithmComplexity";
import { codeData } from "../data/algorithmCode";

const ALGO_INFO = {
  bubble: {
    description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order. It is easy to understand but not efficient for large data sets because its average and worst-case time complexity are quite high.",
    points: [
      "Sorts the array using multiple passes. After the first pass, the maximum element moves to the end, which is its correct position.",
      "In every pass, we process only those elements that have not yet moved to their correct position.",
      "Adjacent elements are compared. If the larger element comes before the smaller element, they are swapped."
    ]
  },
  selection: {
    description: "Selection Sort divides the array into sorted and unsorted portions. In every pass, it finds the smallest element from the unsorted portion and places it at the beginning.",
    points: ["Find the minimum element from the unsorted portion.","Swap it with the first element of the unsorted portion.","After every pass, one more element reaches its correct position."]
  },
  insertion: {
    description: "Insertion Sort builds the sorted array one element at a time. It takes an element from the unsorted portion and inserts it into its correct position in the sorted portion.",
    points: ["Start with the first element as the sorted portion.","Pick the next element and compare it with elements on its left.","Shift larger elements to the right and insert the selected element at its correct position."]
  },
  merge: {
    description: "Merge Sort is a divide-and-conquer sorting algorithm. It repeatedly divides the array into smaller parts, sorts them, and then merges the sorted parts.",
    points: ["Divide the array into two halves.","Recursively sort both halves.","Merge the two sorted halves to produce the final sorted array."]
  },
  quick: {
    description: "Quick Sort is a divide-and-conquer algorithm that uses a pivot to partition the array. Elements smaller than the pivot are placed on one side and larger elements on the other.",
    points: ["Choose an element as the pivot.","Partition the array around the pivot.","Recursively apply the same process to the left and right portions."]
  },
  radix: {
    description: "Radix Sort sorts numbers digit by digit instead of comparing elements directly. It processes digits from the least significant digit to the most significant digit.",
    points: ["Start with the least significant digit.","Group elements according to their current digit.","Repeat the process for each digit until all numbers are sorted."]
  },
  heap: {
    description: "Heap Sort uses a binary heap to repeatedly select the largest or smallest element. It provides consistent O(n log n) time complexity.",
    points: ["Build a max heap from the array.","Move the largest element to the end.","Reduce the heap size and repeat until the array is sorted."]
  },
  shell: {
    description: "Shell Sort is an improved version of Insertion Sort that compares elements separated by a gap. The gap is gradually reduced until the array becomes sorted.",
    points: ["Choose an initial gap.","Perform insertion-sort-like operations for elements separated by the gap.","Reduce the gap and repeat until the gap becomes 1."]
  },
  counting: {
    description: "Counting Sort sorts integers by counting how many times each value occurs. It can be very efficient when the range of values is relatively small.",
    points: ["Find the range of values in the array.","Count the frequency of each value.","Use the frequency information to rebuild the sorted array."]
  },
  bucket: {
    description: "Bucket Sort distributes elements into multiple buckets and then sorts the elements inside each bucket before combining them.",
    points: ["Create several buckets for different value ranges.","Place each element into its appropriate bucket.","Sort the buckets and combine them to form the final sorted array."]
  },
  linear: {
    description: "Linear Search checks each element one by one until the target value is found or the end of the array is reached. It can work on both sorted and unsorted arrays.",
    points: ["Start from the first element.","Compare each element with the target.","Stop when the target is found or all elements have been checked."]
  },
  binary: {
    description: "Binary Search is an efficient searching algorithm that repeatedly divides a sorted array into two halves. It eliminates the half that cannot contain the target.",
    points: ["Find the middle element of the sorted array.","If the middle element is the target, the search is complete.","Otherwise, continue searching in either the left or right half."]
  }
};

function VisualizerPage({
  array,
  setArray,
  size,
  setSize,
  startAlgorithm,
  stopAlgorithm,
  restartVisualization,
  isSorting,
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  comparingIndices,
  sortedIndices,
}) {
  const { type } = useParams();
  const navigate = useNavigate();
  // const [inputArray, setInputArray] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("cpp");
  const [copyMsg, setCopyMsg] = useState("");
  const [target, setTarget] = useState("");

  const isSearchAlgo = type === "linear" || type === "binary";

  // ✅ FIXED: Properly generates and sets new array
const generateArray = (len = size) => {
  if (isSorting) return;

  const newArr = Array.from({ length: len }, () =>
    Math.floor(Math.random() * 90) + 10
  );

  setArray(newArr);
};

  // ✅ FIXED: Proper dependency (no eslint disable needed)
//  useEffect(() => {
//   if (!type) return;
//   generateArray(size);
// }, [type, size]);

  // const handleInsertArray = () => {
  //   if (isSorting) stopAlgorithm();
  //   if (!inputArray.trim()) return;

  //   const parsed = inputArray
  //     .split(",")
  //     .map((n) => parseInt(n.trim()))
  //     .filter((n) => !isNaN(n) && n > 0);

  //   if (parsed.length === 0) {
  //     alert("Enter valid positive numbers like: 5,3,8,1");
  //     return;
  //   }

  //   setSize(parsed.length);
  //   setArray(parsed);
  //   setInputArray("");
  // };

  const handleStart = () => {
    if (isSearchAlgo) {
      if (target === "" || isNaN(Number(target))) {
        alert("Please enter a valid number to search");
        return;
      }
      startAlgorithm(type, Number(target));
    } else {
      startAlgorithm(type);
    }
  };

  // ✅ Better Reset: also regenerate clean array if parent reset is weak
  const handleReset = () => {
    if (isSorting) return;
    restartVisualization?.();
    generateArray(size); // ensures visual reset always works
  };

  const handleCopyCode = () => {
    const code = codeData[type]?.[activeLanguage] || "";
    navigator.clipboard.writeText(code).then(() => {
      setCopyMsg("Copied!");
      setTimeout(() => setCopyMsg(""), 2000);
    });
  };

  const formatTitle = (algo) => {
    if (!algo) return "Algorithm";
    if (algo === "linear" || algo === "binary") {
      return algo.charAt(0).toUpperCase() + algo.slice(1) + " Search";
    }
    return algo.charAt(0).toUpperCase() + algo.slice(1) + " Sort";
  };

  const complexity = algorithmComplexity[type] || {};
  const code = codeData[type] || {};
  const maxVal = array.length ? Math.max(...array) : 100;

  return (
    <div className="viz-page">
      {/* TOP NAV */}
      <div className="viz-topnav">
        <div className="viz-topnav-left">
          <button className="btn-back" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
          <span className="viz-topnav-title">
            🚀 {formatTitle(type)}
          </span>
        </div>
        <div className="viz-topnav-right">
          <span className="algo-tag">{type?.toUpperCase()}</span>
        </div>
      </div>

      <div className="viz-body">
        {/* LEFT PANEL */}
        <div className="viz-left">
          <div className="viz-card">
            <h3 className="info-title">📖 About {formatTitle(type)}</h3>
            <p className="viz-description">
              {ALGO_INFO[type]?.description ||
                "Visualize this algorithm step by step."}
            </p>
            {ALGO_INFO[type]?.points && (
              <ul className="algo-points">
                {ALGO_INFO[type].points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Complexity */}
          <div className="complexity-grid">
            <div className="ccard best">
              <span className="ccard-label">Best</span>
              <span className="ccard-value">{complexity.best || "—"}</span>
            </div>
            <div className="ccard avg">
              <span className="ccard-label">Avg</span>
              <span className="ccard-value">{complexity.average || "—"}</span>
            </div>
            <div className="ccard worst">
              <span className="ccard-label">Worst</span>
              <span className="ccard-value">{complexity.worst || "—"}</span>
            </div>
            <div className="ccard space">
              <span className="ccard-label">Space</span>
              <span className="ccard-value">{complexity.space || "—"}</span>
            </div>
          </div>

          {/* Search Input */}
          {isSearchAlgo && (
            <div className="viz-input-row">
              <input
                type="number"
                className="viz-input"
                placeholder="Enter value to search (e.g. 42)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isSorting}
              />
            </div>
          )}

          {/* Controls */}
          <div className="viz-controls">
            <button
              className="viz-btn start"
              onClick={handleStart}
              disabled={isSorting || array.length === 0}
            >
              ▶ Start
            </button>
            <button
              className="viz-btn stop"
              onClick={stopAlgorithm}
              disabled={!isSorting}
            >
              ⏹ Stop
            </button>
            <button
              className="viz-btn again"
              onClick={() => generateArray(size)}
              disabled={isSorting}
            >
              🔁 New Array
            </button>
            <button
              className="viz-btn restart"
              onClick={handleReset}
              disabled={isSorting}
            >
              ↩ Reset
            </button>
          </div>

          {/* Sliders */}
          <div className="viz-sliders">
            <div className="slider-row">
              <label className="slider-label">
                Array Size <em>{size}</em>
              </label>
              <input
                type="range"
                min="5"
                max="60"
                value={size}
                onChange={(e) => {
                  const v = +e.target.value;
                  setSize(v);
                  generateArray(v);
                }}
                disabled={isSorting}
              />
            </div>

            <div className="slider-row">
              <label className="slider-label">
                Speed <em>{speed}ms</em>
              </label>
              <input
                type="range"
                min="10"
                max="300"
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
              />
            </div>
          </div>

          {/* Custom Array Input */}
          {/* <div className="viz-input-row">
            <input
              type="text"
              className="viz-input"
              placeholder="e.g. 5, 3, 8, 1, 9"
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsertArray()}
            />
            <button
              className="viz-btn insert"
              onClick={handleInsertArray}
              disabled={isSorting}
            >
              Insert
            </button>
          </div> */}

          <div className="viz-legend">
            <span className="legend-item">
              <span className="dot blue" />Unsorted
            </span>
            <span className="legend-item">
              <span className="dot orange" />Comparing
            </span>
            <span className="legend-item">
              <span className="dot green" />Sorted
            </span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="viz-right">

          {/* Current Array Display */}
          <div className="array-display">
            <strong>Array:</strong>{" "}
            [{array.join(", ")}]
          </div>

          <div className="viz-bars-wrap">
            {array.length === 0 ? (
              <div className="viz-empty">
                <span>📊</span>
                <p>Generate or insert an array to start</p>
              </div>
            ) : (
              array.map((val, i) => {
                const isSorted = sortedIndices?.includes(i);
                const isComparing = comparingIndices?.includes(i);
                return (
                  <div className="bar-wrapper" key={i}>
  <span className="bar-value">{val}</span>

  <div
    className={`viz-bar ${
      isSorted
        ? "sorted"
        : isComparing
        ? "comparing"
        : "normal"
    }`}
    style={{ height: `${(val / maxVal) * 88}%` }}
    title={val}
  />
</div>
                );
              })
            )}
          </div>

          {/* Code Panel */}
          <div className="code-panel">
            <div className="code-panel-header">
              <h3 className="code-panel-title">💻 Code Reference</h3>
              <div className="lang-tabs">
                {["cpp", "java", "python"].map((lang) => (
                  <button
                    key={lang}
                    className={`lang-tab ${
                      activeLanguage === lang ? "active" : ""
                    }`}
                    onClick={() => setActiveLanguage(lang)}
                  >
                    {lang === "cpp"
                      ? "C++"
                      : lang === "java"
                      ? "Java"
                      : "Python"}
                  </button>
                ))}
                <button className="copy-btn" onClick={handleCopyCode}>
                  {copyMsg || "Copy"}
                </button>
              </div>
            </div>
            <pre className="code-block">
              {code[activeLanguage] ||
                "// Code not available for this algorithm"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizerPage;