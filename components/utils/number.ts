export function padZero(num: number, targetLen = 2): string {
    let ret = num.toString();
    const retLen = ret.length;

    if (retLen < targetLen) {
        for (let i = 0; i < targetLen - retLen; i++) {
            ret = `0${ret}`;
        }
    }

    return ret;
}
