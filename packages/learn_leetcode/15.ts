/**
 * 思路
 * 一看就是动态规划的题
 * 先找规律
 *
 * 另一种死办法，直接循环计算，就是太慢，肯定满足不了时间要求
 *
 * */
function threeSum(nums: number[]): number[][] {
  const temp:number[][] = [];
  const len = nums.length;
  if (len < 3) {
    return [];
  }
  const newNums = [...new Set(nums)].sort();
  for (let i = 0; i < len; i++) {
    if (newNums[i] > 0) {
      break;
    }
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      const sum = newNums[i] + newNums[left] + newNums[right];
      if (sum === 0) {
        temp.push([newNums[i], newNums[left], newNums[right]]);
        break;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return temp;
}

function threeSum2(nums: number[]): number[][] {
  let temp:number[][] = [];
  const len = nums.length;
  if (len < 3) {
    return [];
  }
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          temp.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }

  if (temp.length < 2) {
    return temp;
  }

  // 去重
  temp = temp.map((item) => item.sort());
  const result:number[][] = [];
  temp.forEach((item, index) => {
    if (index === 0) {
      result.push(item);
    } else if (result.map((_i) => _i.join('')).indexOf(item.join('')) === -1) {
      result.push(item);
    }
  });
  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]
