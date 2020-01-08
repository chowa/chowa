import { Option, OptionGroup, Options, Mode } from './auto-complete';
import { hasProperty } from '../utils';

export function isOptionGroup(option: React.ReactText | Option | OptionGroup) {
    return typeof option === 'object' && hasProperty(option, 'title');
}

export function compileOptions(options: Options, mode: Mode, searchValue?: string): Options {
    if (mode !== 'search') {
        return options;
    }

    const ret: Options = [];

    options.forEach((option: any | Option | OptionGroup) => {
        if (isOptionGroup(option)) {
            const filterChildOptions = compileOptions(option.children, mode, searchValue);

            if (filterChildOptions.length > 0) {
                ret.push({
                    title: option.title,
                    children: filterChildOptions
                });
            }
        }
        else if (typeof option === 'string') {
            if (option.indexOf(searchValue) > -1) {
                ret.push(option);
            }
        }
        else if (typeof option === 'number') {
            if (option.toString().indexOf(searchValue) > -1) {
                ret.push(option);
            }
        }
        else {
            if ((option as Option).value.toString().indexOf(searchValue) > -1) {
                ret.push(option);
            }
        }
    });

    return ret;
}

export function transformOptionsToRealValues(options: Options): React.ReactText[] {
    let realValues = [];

    if (Array.isArray(options)) {
        options.forEach((option) => {
            if (isOptionGroup(option)) {
                realValues = realValues.concat(transformOptionsToRealValues((option as OptionGroup).children));
            }
            else {
                realValues.push(typeof option === 'object' ? (option as Option).value : option);
            }
        });
    }

    return realValues;
}

export function getNextValue(options: Options, activeValue: React.ReactText): React.ReactText {
    const realValues = transformOptionsToRealValues(options);

    if (activeValue === undefined) {
        return realValues[0];
    }

    const currentIndex = realValues.indexOf(activeValue);
    const nextIndex = currentIndex === realValues.length - 1 ? 0 : currentIndex + 1;

    return realValues[nextIndex];
}

export function getPreValue(options: Options, activeValue: React.ReactText): React.ReactText {
    const realValues = transformOptionsToRealValues(options);

    if (activeValue === undefined) {
        return realValues[realValues.length - 1];
    }

    const currentIndex = realValues.indexOf(activeValue);
    const preIndex = currentIndex === 0 ? realValues.length - 1 : currentIndex - 1;

    return realValues[preIndex];
}
