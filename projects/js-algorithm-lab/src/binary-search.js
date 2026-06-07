export function binarySearch(values, target) {
  let left = 0;
  let right = values.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (values[middle] === target) return middle;
    if (values[middle] < target) left = middle + 1;
    else right = middle - 1;
  }

  return -1;
}
