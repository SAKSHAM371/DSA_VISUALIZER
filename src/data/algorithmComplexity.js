const algorithmComplexity = {
  bubble:    { best: "O(n)", average: "O(n²)", worst: "O(n²)",       space: "O(1)" },
  selection: { best: "O(n²)", average: "O(n²)", worst: "O(n²)",      space: "O(1)" },
  insertion: { best: "O(n)", average: "O(n²)", worst: "O(n²)",       space: "O(1)" },
  merge:     { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  quick:     { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)",      space: "O(log n)" },
  radix:     { best: "O(nk)", average: "O(nk)", worst: "O(nk)",      space: "O(n+k)" },
  heap:      { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
  shell:     { best: "O(n log n)", average: "O(n log²n)", worst: "O(n²)",      space: "O(1)" },
  counting:  { best: "O(n+k)", average: "O(n+k)", worst: "O(n+k)",   space: "O(k)" },
  bucket:    { best: "O(n+k)", average: "O(n+k)", worst: "O(n²)",    space: "O(n)" },

  // 🔍 Searching Algorithms
  linear:    { best: "O(1)", average: "O(n)", worst: "O(n)",         space: "O(1)" },
  binary:    { best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
};

export default algorithmComplexity;
