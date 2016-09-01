export function getMinValue(arr) {
  return arr.reduce((min, curr) => Math.min(min, curr), Number.MAX_VALUE)
}
