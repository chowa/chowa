import { Options, Option } from './cascader';

export type SpreadOptions = Options[];

export function compileSelectedOptions(value: React.ReactText[], options: Options): Options {
    const selectedOptions: Options = [];

    if (Array.isArray(value) && value.length > 0) {
        let nextOptions = [].concat(options);

        value.forEach((val) => {
            nextOptions.every((item) => {
                if (item.value === val) {
                    selectedOptions.push(item);
                    nextOptions = item.children;

                    return false;
                }

                return true;
            });
        });
    }

    return selectedOptions;
}

export function computedOptionsTier(options: Options, nextTier = 1): number{
    let tier = 0;

    options.forEach((option) => {
        if (option.children && option.children.length > 0) {
            tier = computedOptionsTier(option.children, nextTier + 1);
        }
        else if (nextTier > tier) {
            tier = nextTier;
        }
    });

    return tier;
}

export function isSearchOption(
    searchValue: string,
    option: Option
): boolean {
    const { value, label } = option;

    if (value.toString().indexOf(searchValue) > -1) {
        return true;
    }

    if (label && label.toString().indexOf(searchValue) > -1) {
        return true;
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
        const matching = onFilter ? onFilter(searchValue, option) : isSearchOption(searchValue, option);
        const filterChildren = Array.isArray(option.children)
            ? filterOptions(option.children, searchValue, onFilter)
            : [];

        if (matching || filterChildren.length > 0) {
            ret.push({
                ...option,
                children: filterChildren.length > 0 ? filterChildren : option.children
            });
        }
    });

    return ret;
}

export function spreadOptions(options: Options): SpreadOptions {
    const ret: SpreadOptions = [];

    [].concat(options).forEach((option) => {
        if (Array.isArray(option.children)) {
            const nextOptions = spreadOptions(option.children);

            nextOptions.forEach((spread) => {
                ret.push([option].concat(spread));
            });
        }
        else {
            ret.push([option]);
        }
    });

    return ret;
}

export function getRealOptions(selectedOptions: Options, options: Options, optionsTier: number) {
    return (
        selectedOptions.length === 0
            ? options
            : (
                optionsTier === selectedOptions.length
                    ? selectedOptions[selectedOptions.length - 2].children || []
                    : selectedOptions[selectedOptions.length - 1].children || []
            )
    ).filter((item) => item.disabled !== true);
}

export function getPreOption(selectedOptions: Options, options: Options, optionsTier: number, option: Option): Option {
    const realOptions = getRealOptions(selectedOptions, options, optionsTier);

    if (option === undefined) {
        return realOptions[realOptions.length - 1];
    }

    const currentIndex = realOptions.findIndex((item) => item.value === option.value);
    const preIndex = currentIndex === 0 ? realOptions.length - 1 : currentIndex - 1;

    return realOptions[preIndex];
}

export function getNextOption(selectedOptions: Options, options: Options, optionsTier: number, option: Option): Option {
    const realOptions = getRealOptions(selectedOptions, options, optionsTier);

    if (option === undefined) {
        return realOptions[0];
    }

    const currentIndex = realOptions.findIndex((item) => item.value === option.value);
    const nextIndex = currentIndex === realOptions.length - 1 ? 0 : currentIndex + 1;

    return realOptions[nextIndex];
}

export function getPreFilterOption(options: Options, spread: Options): Options {
    const realOptions = spreadOptions(options)
        .filter((nextSpread) => {
            return nextSpread.some((item) => item.disabled === true) !== true;
        });

    if (spread === undefined) {
        return realOptions[0];
    }

    const matchValue = spread.reduce((pre, cur) => pre + cur.value.toString(), '');
    const currentIndex = realOptions.findIndex((nextSpread) => {
        return matchValue === nextSpread.reduce((pre, cur) => pre + cur.value.toString(), '');
    });
    const preIndex = currentIndex === 0 ? realOptions.length - 1 : currentIndex - 1;

    return realOptions[preIndex];
}

export function getNextFilterOption(options: Options, spread: Options): Options {
    const realOptions = spreadOptions(options)
        .filter((nextSpread) => {
            return nextSpread.some((item) => item.disabled === true) !== true;
        });

    if (spread === undefined) {
        return realOptions[0];
    }

    const matchValue = spread.reduce((pre, cur) => pre + cur.value.toString(), '');
    const currentIndex = realOptions.findIndex((nextSpread) => {
        return matchValue === nextSpread.reduce((pre, cur) => pre + cur.value.toString(), '');
    });
    const nextIndex = currentIndex === realOptions.length - 1 ? 0 : currentIndex + 1;

    return realOptions[nextIndex];
}
