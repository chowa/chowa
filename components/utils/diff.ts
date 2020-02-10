import * as moment from 'moment';

export function hasProperty(obj: any, property: any): boolean {
    if (obj === undefined || obj === null) {
        return false;
    }

    return Object.prototype.hasOwnProperty.call(obj, property);
}

export function isReactElement(ele: any) {
    if (hasProperty(ele, '$$typeof') && ele.$$typeof === Symbol.for('react.element')) {
        return true;
    }

    return false;
}

export function isEqual(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }

    if (isReactElement(a) || isReactElement(b)) {
        return isReactElement(a) && isReactElement(b)
            ? isEqual(a.props, b.props)
            : false;
    }

    if (typeof a === 'object' && typeof b === 'object') {
        if (a instanceof Date && b instanceof Date) {
            return +a === +b;
        }
        else if (a instanceof RegExp && b instanceof RegExp) {
            return a.toString() === b.toString();
        }

        else if (Array.isArray(a) && Array.isArray(b)) {
            const arrLen = a.length;

            if (arrLen !== b.length) {
                return false;
            }
            for (let i = arrLen; i--; i !== 0) {
                if (!isEqual(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        else {
            const keys = Object.keys(a);
            const objLen = keys.length;

            if (objLen !== Object.keys(b).length) {
                return false;
            }

            for (let i = objLen; i--; i !== 0) {
                if (!hasProperty(b, keys[i])) {
                    return false;
                }
            }

            for (let i = objLen; i--; i !== 0) {
                const key = keys[i];
                if (!isEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
    }

    return a !== a && b !== b;
}

export function isSameMoment(
    a: moment.Moment,
    b: moment.Moment,
    granularity: moment.unitOfTime.StartOf = 'second'
): boolean {
    if (moment.isMoment(a) && moment.isMoment(b)) {
        return a.isSame(b, granularity);
    }

    return a === b;
}

export function isExist(a: any): boolean {
    if (
        a === undefined
        || a === null
        || a === ''
        || (typeof a === 'object' && Object.keys(a).length === 0)
        || (typeof a === 'number' && isNaN(a))
        || /^\s+$/.test(a)
    ) {
        return false;
    }

    return true;
}
