import { sleep } from "./sorting";

export const bubbleSort = async (
  array,
  setArray,
  speed,
  stopRef,
  setComparingIndices,
  setSortedIndices
) => {
  const a = [...array];

  for (let i = 0; i < a.length - 1; i++) {
    if (stopRef.current) return;

    for (let j = 0; j < a.length - i - 1; j++) {
      if (stopRef.current) return;

      setComparingIndices?.([j, j + 1]);

      await sleep(speed);

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];

        setArray([...a]);

        await sleep(speed);
      }

      setComparingIndices?.([]);
    }

    setSortedIndices?.(
      Array.from({ length: i + 1 }, (_, k) => a.length - 1 - k)
    );
  }

  setComparingIndices?.([]);
  setSortedIndices?.(Array.from({ length: a.length }, (_, i) => i));
};