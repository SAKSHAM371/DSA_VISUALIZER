export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// ── MERGE SORT ────────────────────────────────────────────────────────────────
export const mergeSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];

  async function merge(arr, l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      if (stopRef?.current) return;
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
      setArray([...arr]);
      await sleep(speed);
    }
    while (i < left.length) { arr[k++] = left[i++]; setArray([...arr]); await sleep(speed); }
    while (j < right.length) { arr[k++] = right[j++]; setArray([...arr]); await sleep(speed); }
  }

  async function sort(arr, l, r) {
    if (l >= r || stopRef?.current) return;
    const m = Math.floor((l + r) / 2);
    await sort(arr, l, m);
    await sort(arr, m + 1, r);
    await merge(arr, l, m, r);
  }

  await sort(a, 0, a.length - 1);
};

// ── QUICK SORT ────────────────────────────────────────────────────────────────
export const quickSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];

  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (stopRef?.current) return i;
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);
    return i + 1;
  }

  async function sort(arr, low, high) {
    if (low < high && !stopRef?.current) {
      const pi = await partition(arr, low, high);
      await sort(arr, low, pi - 1);
      await sort(arr, pi + 1, high);
    }
  }

  await sort(a, 0, a.length - 1);
};

// ── RADIX SORT ────────────────────────────────────────────────────────────────
export const radixSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];
  const max = Math.max(...a);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    if (stopRef?.current) return;
    const output = new Array(a.length).fill(0);
    const count = new Array(10).fill(0);
    for (let i = 0; i < a.length; i++) count[Math.floor(a[i] / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = a.length - 1; i >= 0; i--) {
      const digit = Math.floor(a[i] / exp) % 10;
      output[--count[digit]] = a[i];
    }
    for (let i = 0; i < a.length; i++) {
      if (stopRef?.current) return;
      a[i] = output[i];
      setArray([...a]);
      await sleep(speed);
    }
  }
};

// ── INSERTION SORT ────────────────────────────────────────────────────────────
export const insertionSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];
  for (let i = 1; i < a.length; i++) {
    if (stopRef?.current) return;
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      if (stopRef?.current) return;
      [a[j], a[j - 1]] = [a[j - 1], a[j]];
      setArray([...a]);
      await sleep(speed);
      j--;
    }
  }
};

// ── HEAP SORT ─────────────────────────────────────────────────────────────────
export const heapSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];
  const n = a.length;

  async function heapify(arr, size, i) {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await sleep(speed);
      if (!stopRef?.current) await heapify(arr, size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (stopRef?.current) return;
    await heapify(a, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    if (stopRef?.current) return;
    [a[0], a[i]] = [a[i], a[0]];
    setArray([...a]);
    await sleep(speed);
    await heapify(a, i, 0);
  }
};

// ── SHELL SORT ────────────────────────────────────────────────────────────────
export const shellSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];
  for (let gap = Math.floor(a.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < a.length; i++) {
      if (stopRef?.current) return;
      let j = i;
      while (j >= gap && a[j - gap] > a[j]) {
        if (stopRef?.current) return;
        [a[j], a[j - gap]] = [a[j - gap], a[j]];
        setArray([...a]);
        await sleep(speed);
        j -= gap;
      }
    }
  }
};

// ── COUNTING SORT ─────────────────────────────────────────────────────────────
export const countingSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];
  const max = Math.max(...a);
  const count = new Array(max + 1).fill(0);
  for (let x of a) count[x]++;
  let idx = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i]-- > 0) {
      if (stopRef?.current) return;
      a[idx++] = i;
      setArray([...a]);
      await sleep(speed);
    }
  }
};

// ── BUCKET SORT ───────────────────────────────────────────────────────────────
export const bucketSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];
  const max = Math.max(...a);
  const bucketCount = Math.floor(max / 10) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);
  for (let x of a) buckets[Math.floor(x / 10)].push(x);
  for (let b of buckets) b.sort((x, y) => x - y);
  let idx = 0;
  for (let b of buckets) {
    for (let x of b) {
      if (stopRef?.current) return;
      a[idx++] = x;
      setArray([...a]);
      await sleep(speed);
    }
  }
};

// --------LINEAR SEARCH ------------------------
export const linearSearch = async (
  array,
  target,
  setArray,
  speed,
  stopRef,
  setComparingIndices,
  setSortedIndices
) => {
  const a = [...array];

  for (let i = 0; i < a.length; i++) {
    if (stopRef?.current) return -1;

    // Highlight current bar being checked (orange)
    setComparingIndices([i]);
    await sleep(speed);

    if (a[i] === target) {
      // Highlight found element (green)
      setComparingIndices([]);
      setSortedIndices([i]);

      alert(`✅ Element ${target} found at index ${i}`);
      return i;
    }
  }

  // Not found case
  setComparingIndices([]);
  alert(`❌ Element ${target} does not exist in the array`);
  return -1;
};


// ------ BINARY SEARCH------------------------------
export const binarySearch = async (
  array,
  target,
  setArray,
  speed,
  stopRef,
  setComparingIndices,
  setSortedIndices
) => {
  // Binary search needs sorted array
  const a = [...array].sort((x, y) => x - y);
  setArray([...a]);

  let left = 0;
  let right = a.length - 1;

  while (left <= right) {
    if (stopRef?.current) return -1;

    const mid = Math.floor((left + right) / 2);

    // Highlight mid index (orange)
    setComparingIndices([mid]);
    await sleep(speed);

    if (a[mid] === target) {
      setComparingIndices([]);
      setSortedIndices([mid]);

      alert(`✅ Element ${target} found at index ${mid} (in sorted array)`);
      return mid;
    } else if (a[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  setComparingIndices([]);
  alert(`❌ Element ${target} does not exist in the array`);
  return -1;
};
