import { sleep } from "./sorting";

export const linearSearch = async (
  array,
  target,
  setArray,
  speed,
  stopRef,
  setComparingIndices,
  setSortedIndices
) => {
  if (!array.length) {
    alert("Array is empty!");
    return -1;
  }

  for (let i = 0; i < array.length; i++) {
    if (stopRef?.current) return -1;

    // Highlight current bar (orange)
    setComparingIndices([i]);
    await sleep(speed);

    if (array[i] === target) {
      // Highlight found bar (green)
      setComparingIndices([]);
      setSortedIndices([i]);

      alert(`✅ Element ${target} found at index ${i}`);
      return i;
    }
  }

  setComparingIndices([]);
  alert(`❌ Element ${target} does not exist in the array`);
  return -1;
};

export const binarySearch = async (
  array,
  target,
  setArray,
  speed,
  stopRef,
  setComparingIndices,
  setSortedIndices
) => {
  if (!array.length) {
    alert("Array is empty!");
    return -1;
  }

  // Sort array first for binary search
  const sortedArr = [...array].sort((a, b) => a - b);
  setArray(sortedArr);
  await sleep(speed);

  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    if (stopRef?.current) return -1;

    const mid = Math.floor((left + right) / 2);

    // Highlight mid bar
    setComparingIndices([mid]);
    await sleep(speed);

    if (sortedArr[mid] === target) {
      setComparingIndices([]);
      setSortedIndices([mid]);

      alert(`✅ Element ${target} found at index ${mid} (sorted array)`);
      return mid;
    } else if (sortedArr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  setComparingIndices([]);
  alert(`❌ Element ${target} does not exist in the array`);
  return -1;
};
