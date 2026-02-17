import { sleep } from "./sorting";

export  const bubbleSort = async (array, setArray, speed, stopRef) => {
  const a = [...array];

  for (let i = 0; i < a.length; i++) {
    if (stopRef?.current) return;

    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (stopRef?.current) return;
      if (a[j] < a[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      setArray([...a]);
      await sleep(speed);
    }
  }
};
