'use strict';

/** 没想到class可以这样用，以前总觉得class没啥用处，天才的写法啊，非常值得借鉴
 * 【多态取代条件表达式】简直是太棒了，我以后要多用
 */
class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        throw 'subclass responsibility';// cool!!! 类被他用的太酷了！！！经常看类的定义，我咋就没有想到！可以提醒后来者实现这个函数
    }

    get volumeCredits(){
        return Math.max(this.performance.audience - 30, 0);
    }
}

class TragedyCalculator extends PerformanceCalculator{
    get amount(){
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator{
    get amount(){
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits(){
        return super.volumeCredits+Math.floor(this.performance.audience / 5);
    }
}

function createPerformanceCalculator(aPerformance, aPlay){
    switch(aPlay.type) {// cool!!!
        case 'tragedy':
            return new TragedyCalculator(aPerformance, aPlay);
        case 'comedy':
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`unknown type:${aPlay.type}`)
    }
}

export default function createStatementData(invoice, plays) {
    const statementData = {
        customer: invoice.customer,
        performances: invoice.performances.map(enrichPerformance),
    };
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalAmount(data) {
        return data.performances.reduce((total, pref) => total + pref.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, pref) => total + pref.volumeCredits, 0);
    }
}
