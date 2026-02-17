import { sleep } from "./sorting";

// 🔍 Linear Search
export async function linearSearch(array, target, setActiveIndex, speed) {
  for (let i = 0; i < array.length; i++) {
    setActiveIndex(i);
    await sleep(speed);
    if (array[i] === target) return i;
  }
  return -1;
}

// 🔍 Binary Search (array must be sorted)
export async function binarySearch(array, target, setActiveIndex, speed) {
  let left = 0,
    right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    setActiveIndex(mid);
    await sleep(speed);

    if (array[mid] === target) return mid;
    else if (array[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
