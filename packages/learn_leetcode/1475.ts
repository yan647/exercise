/**
 * Created by lsq on 2022/9/1.
 */

'use strict';

function finalPrices(prices: number[]): number[] {
    const result = [];
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j <= prices.length; j++) {
            if (prices[j] <= prices[i]) {
                result.push(prices[i] - prices[j]);
                break;
            }
            if (j === prices.length) {
                console.log(`i=${i},j=${j}`);
                result.push(prices[i]);
            }
        }
    }
    return result;
};

console.log(finalPrices([8, 4, 6, 2, 3]));
