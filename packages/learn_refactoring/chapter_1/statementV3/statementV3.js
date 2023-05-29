'use strict';

import {invoiceData} from '../invoices.js';
import {playsData} from '../plays.js';
import createStatementData from "./createStatementData";

// 1.6节的修改结果
function statementV3(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {

}


function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        // print line for this order
        result += `	${perf.play.name}: ${usd(perf.amount)(${perf.audience})} seats\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n}`
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(aNumber / 100);
    }
}

console.log(statementV3(invoiceData, playsData));

