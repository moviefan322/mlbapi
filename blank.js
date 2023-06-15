const array1 = ['a', 'b', 'c', 'd', 'e', 'f'];
const array2 = ['g', 'h', 'i'];

function shiftAndMerge(array1, array2) {
  const shiftedElements = array1.splice(-3); // Remove the last three elements from array1
  array2.unshift(...shiftedElements); // Add the shifted elements to the front of array2
  return [array1, array2]; // Return both arrays separately
}

const [shiftedArray1, shiftedArray2] = shiftAndMerge(array1, array2);
console.log(shiftedArray1); // Output: ['a', 'b', 'c']
console.log(shiftedArray2); // Output: ['d', 'e', 'f', 'g', 'h', 'i']


const for10929 = schedule[109][29];
const for10928 = [
  schedule[109][28][3],
  schedule[109][28][4],
  schedule[109][28][5],
];

schedule[109][28] = for29;
schedule[109][29] = for28;