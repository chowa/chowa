import * as props from './props';
import * as namespace from './namespace';
import * as bubbling from './bubbling';
import * as diff from './diff';
import * as effect from './effect';
import * as number from './number';
import doms from './doms';

export * from './props';
export * from './namespace';
export * from './bubbling';
export * from './diff';
export * from './effect';
export * from './number';
export { default as doms } from './doms';
export { default as ClearButton } from './clear-button';

const utils = {
    ...props,
    ...namespace,
    ...bubbling,
    ...diff,
    ...effect,
    ...number,
    doms
};

export default utils;
