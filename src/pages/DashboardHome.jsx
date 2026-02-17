import React from "react";
import { useNavigate } from "react-router-dom";

const SORTING_ALGOS = [
  { key: "bubble",    label: "Bubble Sort",    icon: "🫧", tag: "O(n²)",       color: "#ef4444" },
  { key: "insertion", label: "Insertion Sort", icon: "🃏", tag: "O(n²)",       color: "#f97316" },
  { key: "selection", label: "Selection Sort", icon: "🎯", tag: "O(n²)",       color: "#f59e0b" },
  { key: "merge",     label: "Merge Sort",     icon: "🔀", tag: "O(n log n)",  color: "#22c55e" },
  { key: "quick",     label: "Quick Sort",     icon: "⚡", tag: "O(n log n)",  color: "#3b82f6" },
  { key: "heap",      label: "Heap Sort",      icon: "🌳", tag: "O(n log n)",  color: "#6366f1" },
  { key: "shell",     label: "Shell Sort",     icon: "🐚", tag: "O(n log²n)", color: "#8b5cf6" },
  { key: "counting",  label: "Counting Sort",  icon: "🔢", tag: "O(n+k)",      color: "#06b6d4" },
  { key: "bucket",    label: "Bucket Sort",    icon: "🪣", tag: "O(n+k)",      color: "#14b8a6" },
  { key: "radix",     label: "Radix Sort",     icon: "📡", tag: "O(nk)",       color: "#a855f7" },
];

const SEARCHING_ALGOS = [
  { key: "linear", label: "Linear Search", icon: "🔍", tag: "O(n)",      color: "#38bdf8" },
  { key: "binary", label: "Binary Search", icon: "⚡", tag: "O(log n)", color: "#34d399" },
];

const DashboardHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* ── NAVBAR ── */}
      <nav className="dash-nav">
        <div className="dash-nav-logo">
          <span className="logo-icon">⬛</span>
          <span className="logo-text">DSA<span className="logo-accent">Viz</span></span>
        </div>
        <div className="dash-nav-right">
          <span className="dash-greeting">Hi, {user?.name || "Developer"} 👋</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="dash-hero">
        <div className="dash-hero-inner">
          <h1 className="dash-hero-title">
            Visualize <span className="hero-accent">Algorithms</span><br />Like Never Before
          </h1>
          <p className="dash-hero-sub">
            Step-by-step animations, complexity analysis, and code — all in one place.
          </p>
          <div className="hero-stats">
            <div className="stat-pill">🧠 10 Sorting Algorithms</div>
            <div className="stat-pill">🔍 2 Search Algorithms</div>
            <div className="stat-pill">💻 C++ · Java · Python</div>
          </div>
        </div>
        <div className="hero-visual">
          {[40, 70, 30, 90, 55, 75, 20, 85, 45, 60].map((h, i) => (
            <div key={i} className="hero-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="dash-content">

        {/* Sorting */}
        <section className="algo-section">
          <div className="section-header">
            <h2 className="section-title">🔃 Sorting Algorithms</h2>
            <span className="section-count">{SORTING_ALGOS.length} algorithms</span>
          </div>
          <div className="algo-grid">
            {SORTING_ALGOS.map((algo) => (
              <AlgoCard key={algo.key} algo={algo} onClick={() => navigate(`/visualizer/${algo.key}`)} />
            ))}
          </div>
        </section>

        {/* Searching */}
        <section className="algo-section">
          <div className="section-header">
            <h2 className="section-title">🔍 Searching Algorithms</h2>
            <span className="section-count">{SEARCHING_ALGOS.length} algorithms</span>
          </div>
          <div className="algo-grid">
            {SEARCHING_ALGOS.map((algo) => (
              <AlgoCard key={algo.key} algo={algo} onClick={() => navigate(`/visualizer/${algo.key}`)} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const AlgoCard = ({ algo, onClick }) => (
  <div className="algo-card" onClick={onClick} style={{ "--accent": algo.color }}>
    <div className="card-top">
      <span className="card-icon">{algo.icon}</span>
      <span className="card-tag" style={{ color: algo.color, borderColor: algo.color + "44" }}>
        {algo.tag}
      </span>
    </div>
    <h3 className="card-title">{algo.label}</h3>
    <div className="card-footer">
      <span className="card-cta">Visualize →</span>
    </div>
  </div>
);

export default DashboardHome;
