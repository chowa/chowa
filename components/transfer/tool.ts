import { Data } from './transfer';
import { isExist } from '../utils';

export function perfectDataIndex(data: Data): Data {
    return data.map((record, index) => {
        return {
            ...record,
            index: isExist(record.index) ? record.index : index
        };
    });
}

export function compuntedSelectedIndexs(
    selectedIndexs: React.ReactText[],
    result: React.ReactText[]
): { targetSelectedIndexs: React.ReactText[]; sourceSelectedIndexs: React.ReactText[] } {
    const sourceSelectedIndexs = [];
    const targetSelectedIndexs = [];

    selectedIndexs.forEach((index) => {
        if (result.includes(index)) {
            targetSelectedIndexs.push(index);
        }
        else {
            sourceSelectedIndexs.push(index);
        }
    });

    return {
        targetSelectedIndexs,
        sourceSelectedIndexs
    };
}
