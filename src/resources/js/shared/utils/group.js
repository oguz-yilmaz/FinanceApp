import moment from "moment";

export function paginate(array, pageSize, pageNumber) {
    let arr = [...array];
    return arr.slice(
        (pageNumber - 1) * parseInt(pageSize),
        pageNumber * pageSize
    );
}

export function getBalanceKey(balance) {
    return balance.date.split(" ")[0];
}

export function groupBalances(balances) {
    let res = new Map(),
        keyName;

    for (const balance of balances) {
        keyName = getBalanceKey(balance);
        if (res[keyName]) {
            res[keyName].push(balance);
        } else {
            res[keyName] = [balance];
        }
    }

    return res;
}
