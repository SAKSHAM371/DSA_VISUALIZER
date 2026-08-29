import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import algorithmComplexity from "../data/algorithmComplexity";
import { codeData } from "../data/algorithmCode";

const ALGO_DESCRIPTIONS = {
  bubble:    "Repeatedly swaps adjacent elements that are in the wrong order. Simple but O(n²) — great for learning.",
  selection: "Finds the minimum element each pass and places it at the front. Always O(n²) comparisons.",
  insertion: "Builds sorted array one item at a time. Efficient for small or nearly-sorted arrays.",
  merge:     "Divides, sorts, and merges. Guaranteed O(n log n) — stable and reliable.",
  quick:     "Partitions around a pivot. Very fast in practice with average O(n log n).",
  radix:     "Digit-by-digit sort. Linear time O(nk) — no comparisons needed.",
  heap:      "Uses a max-heap structure. Guaranteed O(n log n) with O(1) space.",
  shell:     "Generalization of insertion sort using gap sequences. Faster for medium datasets.",
  counting:  "Counts element frequencies. O(n+k) — blazing fast for integer ranges.",
  bucket:    "Distributes elements into buckets, sorts each. Great for uniformly distributed data.",
  linear:    "Checks each element one by one. O(n) — works on unsorted arrays.",
  binary:    "Divide and conquer search. O(log n) — requires sorted array.",
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
            <p className="viz-description">
              {ALGO_DESCRIPTIONS[type] || "Visualize this algorithm step by step."}
            </p>
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