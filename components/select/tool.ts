import * as React from 'react';
import SelectOption from './select-option';
import SelectOptionGroup from './select-option-group';
import { Options, Option, OptionGroup } from './select';
import { isEqual, isReactElement, hasProperty } from '../utils';

export function transformReactNodeToOptions(children: React.ReactNode): Options {
    const options: Options = [];

    React.Children.forEach(children, (child: React.ReactElement<any>) => {
        if (!isReactElement(child) || (child.type !== SelectOption && child.type !== SelectOptionGroup)) {
            return;
        }

        if (child.type === SelectOption) {
            options.push({
                ...child.props
            });
        }
        if (child.type === SelectOptionGroup) {
            options.push({
                ...child.props,
                options: transformReactNodeToOptions(child.props.children)
            });
        }
    });

    return options;
}

export function compileValue(value: any[] | any): any[] {
    if (Array.isArray(value)) {
        return value;
    }

    return value === undefined ? [] : [value];
}

export function compileSelectedOptions(values: any[], options: Options): Option[] {
    const selectedOptions = [];

    options.forEach((option) => {
        if (hasProperty(option, 'options')) {
            compileSelectedOptions(values, (option as OptionGroup).options).forEach((nextTierOption) => {
                selectedOptions.push(nextTierOption);
            });
        }
        else {
            if (values.findIndex((value) => isEqual(value, (option as Option).value)) > -1) {
                selectedOptions.push(option);
            }
        }
    });

    return selectedOptions;
}

export function getOptionLabel(option: Option): React.ReactNode {
    return option.children || option.label;
}

export function isSearchOption(
    searchValue: string,
    option: Option
): boolean {
    const { value, label, guessers, children } = option;

    if (value.toString().indexOf(searchValue) > -1) {
        return true;
    }

    if (typeof children !== 'object' && children.toString().indexOf(searchValue) > -1) {
        return true;
    }

    if (label && label.toString().indexOf(searchValue) > -1) {
        return true;
    }

    if (guessers) {
        return guessers.some((guesser) => {
            return guesser.toString().indexOf(searchValue) > -1;
        });
    }

    return false;
}

export function filterOptions(
    options: Options,
    searchValue: string,
    onFilter?: (searchValue: string, option: Option) => boolean
): Options {
    if (!searchValue) {
        return options;
    }

    const ret: Options = [];

    options.forEach((option) => {
        if (hasProperty(option, 'options')) {
            const nextTierOption = filterOptions(
                (option as OptionGroup).options,
                searchValue,
                onFilter
            );

            if (nextTierOption.length > 0) {
                options.push({
                    title: (option as OptionGroup).title,
                    className: (option as OptionGroup).className,
                    options: nextTierOption
                });
            }
        }
        else {
            const matching = onFilter
                ? onFilter(searchValue, option as Option)
                : isSearchOption(searchValue, option as Option);
            if (matching) {
                ret.push(option);
            }
        }
    });

    return ret;
}

export function transformRenderOptionsToRealOptions(options: Options): Option[] {
    let realOptions = [];

    options.forEach((option) => {
        if (hasProperty(option, 'options')) {
            realOptions = realOptions.concat(transformRenderOptionsToRealOptions((option as OptionGroup).options));
        }
        else {
            realOptions.push(option);
        }
    });

    return realOptions;
}

export function getNextOption(options: Options, searchValue: string, option: Option): Option {
    let realOptions = transformRenderOptionsToRealOptions(options)
        .filter((item) => item.disabled !== true);

    if (searchValue !== '') {
        realOptions = realOptions.filter((item) => {
            return isSearchOption(searchValue, item);
        });
    }

    if (option === undefined) {
        return realOptions[0];
    }

    const currentIndex = realOptions.findIndex((item) => item.value === option.value);
    const nextIndex = currentIndex === realOptions.length - 1 ? 0 : currentIndex + 1;

    return realOptions[nextIndex];
}

export function getPreOption(options: Options, searchValue: string, option: Option): Option {
    let realOptions = transformRenderOptionsToRealOptions(options)
        .filter((item) => item.disabled !== true);

    if (searchValue !== '') {
        realOptions = realOptions.filter((item) => {
            return isSearchOption(searchValue, item);
        });
    }

    if (option === undefined) {
        return realOptions[realOptions.length - 1];
    }

    const currentIndex = realOptions.findIndex((item) => item.value === option.value);
    const preIndex = currentIndex === 0 ? realOptions.length - 1 : currentIndex - 1;

    return realOptions[preIndex];
}
