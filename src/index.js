module.exports = function check(str, bracketsConfig) {
    if (str.length % 2 != 0) return false;
    let newArray = str.split("");
    let last;
    let q;
    let z;
    let reg;
    let count = 0;
    checkNext: for (let i = 0; i < bracketsConfig.length; i++) {
        count++;
        if (count > 20 && str.length != 0) return false;
        last = newArray.lastIndexOf(bracketsConfig[i][0]);
        if (last == -1) {
            if (bracketsConfig.length - 1 == i) {
                i = -1;
                continue;
            } else {
                continue;
            }
        }
        q = bracketsConfig[i][0];
        z = bracketsConfig[i][1];

        if (!(isFinite(q) && isFinite(z))) {
            reg = new RegExp("\\" + q + "\\" + z, "g");
        } else {
            reg = new RegExp(q + z, "g");
        }
        while (str.match(reg)) {
            str = str.replace(reg, "");
            if (str.length == 0) return true;
            newArray = str.split("");
            if (str.match(reg)) {
                continue;
            } else {
                if (bracketsConfig.length - 1 == i) {
                    i = -1;
                    continue checkNext;
                } else {
                    continue checkNext;
                }
            }
        }
        if (newArray.length == 2) {
            if (
                newArray[0] == bracketsConfig[i][0] &&
                newArray[1] == bracketsConfig[i][1]
            ) {
                return true;
            }
        }
        if (last == newArray.length - 1) {
            if (
                newArray.length != 0 &&
                bracketsConfig[i][0] == bracketsConfig[i][1]
            ) {
                continue;
            } else {
                return false;
            }
        }
        while (last != -1) {
            if (newArray[last + 1] == bracketsConfig[i][1]) {
                newArray = newArray
                    .slice(0, last)
                    .concat(newArray.splice(last + 2));
                last = newArray.lastIndexOf(bracketsConfig[i][0]);
                if (last == -1 && newArray.length == 0) return true;
            } else {
                continue checkNext;
            }
        }
        if (i == bracketsConfig.length - 1 && newArray.length != 0) {
            i = -1;
        }
    }
    if (newArray.length == 0) {
        return true;
    } else {
        return false;
    }
};
