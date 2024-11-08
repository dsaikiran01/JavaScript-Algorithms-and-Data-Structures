// initial price and cash-in-drawer
let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

// all elements in the document
const changeDueElement = document.getElementById("change-due");
const givenCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const amountToPay = document.getElementById("to-pay");
const acList = document.getElementById("ac-list");

amountToPay.innerText = price;

// total cash-in-drawer
const totalCid = Number(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));
console.log("total cid:" + totalCid);

const calculateChange = cash => {
    let due = Math.round((cash - price) * 100);
    console.log("Due in cents: " + due);

    const cidReverse = cid.slice().reverse();
    const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

    // Total cash in drawer (cid) in cents
    const totalCidInCents = Math.round(cid.reduce((acc, curr) => acc + curr[1] * 100, 0));
    console.log("Total cid in cents:", totalCidInCents);

    if (due > totalCidInCents) {
        changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (due === 0) {
        changeDueElement.innerText = "No change due - customer paid with exact cash";
    } else {
        let changeToHandover = `Status: ${totalCidInCents >= due ? "OPEN" : "CLOSED"}`;
        let remainingDue = due;
        let changeGiven = [];

        for (let i = 0; i < cidReverse.length; i++) {
            const denomValue = denominations[i];
            const coinName = cidReverse[i][0];
            let coinAmount = Math.round(cidReverse[i][1] * 100); // convert to cents
            let coinCount = 0;

            // Calculate the number of coins of this denomination
            while (remainingDue >= denomValue && coinAmount >= denomValue) {
                remainingDue -= denomValue;
                coinAmount -= denomValue;
                coinCount++;
            }

            if (coinCount > 0) {
                changeGiven.push([coinName, coinCount * denomValue / 100]); // add coin count to result
                changeToHandover += ` ${coinName}: \$${(coinCount * denomValue / 100).toFixed(2)}`;
            }
        }

        if (remainingDue > 0) {
            changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
        } else if (remainingDue === 0 && totalCidInCents === due) {
            changeDueElement.innerText = "Status: CLOSED" + changeGiven.map(coin => ` ${coin[0]}: \$${coin[1].toFixed(2)}`).join("");
        } else {
            changeDueElement.innerText = changeToHandover;
        }
    }
};

const main = e => {
    e.preventDefault();
    const moneyGiven = Number(givenCash.value);

    if (moneyGiven == price) {
        changeDueElement.innerText = "No change due - customer paid with exact cash";
    } else if (moneyGiven < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (moneyGiven > price) {
        calculateChange(moneyGiven);
    }
}

// for showing the cash-in-drawer
for (const arr of cid) {
    acList.innerText += `${arr[0]} : ${arr[1]}\n`;
}

// Calculation of change
purchaseBtn.addEventListener('click', e => {
    main(e);
});

purchaseBtn.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        main(e);
    }
});

// window refresh
window.onload = () => {
    givenCash.value = "";
}