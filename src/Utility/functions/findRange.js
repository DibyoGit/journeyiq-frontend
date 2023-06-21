export function getRange(minimumValue, maximumValue, numberOfParts) {
  let minValue = parseFloat(minimumValue.toFixed(2));
  const maxValue = parseFloat(maximumValue.toFixed(2));
  //   const numberOfParts = 10;

  const rangeValue = Math.ceil(maxValue) - Math.floor(minValue);

  const partSize = parseFloat((rangeValue / numberOfParts).toFixed(2));

  const parts = [];
  let currentValue = parseFloat(minValue);
  for (let i = 0; i < numberOfParts; i++) {
    parts.push(currentValue);
    currentValue = parseFloat((currentValue + partSize).toFixed(2));
  }
  return parts;
}
