import * as React from 'react';

export type OmitProps<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function otherProps(
    propTypes: React.WeakValidationMap<any>,
    props: React.Props<any>
): React.Props<any> {
    const childProps = {};

    for (const property in props) {
        if (!(property in propTypes) && property !== 'children') {
            childProps[property] = props[property];
        }
    }

    return childProps;
}

export function omitProps(props: React.Props<any>, omits: string[]): React.Props<any> {
    const retProps = {};

    for (const property in props) {
        if (!omits.includes(property) && property !== 'children') {
            retProps[property] = props[property];
        }
    }

    return retProps;
}
