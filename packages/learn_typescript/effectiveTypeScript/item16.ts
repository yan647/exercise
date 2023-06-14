//https://learning.oreilly.com/library/view/effective-typescript/9781492053736/ch02.html#number-index
interface myArray<T> {
  [k: number]: T;
}

const xs = [1, 2, 3];
const x0 = xs[0];
// const x1 = xs['1'];
//
// function get<T>(array: Array<T>, k: string): T {
//   return array[k];
// }

// console.log(get(xs, '1'));

for (const x of xs) {
  console.log(typeof x);//number
}

xs.forEach((x, i) => {
  console.log('foreach-x', typeof x);//number
  console.log('foreach-i', typeof i);//number
});

xs.map((x, i) => {
  console.log('map-x', typeof x);//number
  console.log('map-i', typeof i);//number
});

function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
  if (i < xs.length) {
    return xs[i];
  }
  throw new Error('Attempt to access ${i} which is past end of array.');
}
