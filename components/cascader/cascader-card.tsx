import * as React from 'react';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import { Options, Option } from './cascader';

export type OptionTitles = string[];

export interface CascaderCardProps {
    options: Options;
    optionTitles: OptionTitles;
    optionsTier: number;
    selectedOptions: Options;
    onSelect: (option: Option, tier: number) => void;
    activeOption: Option;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onOptionMouseEnter: (option: Option) => void;
    onOptionMouseLeave: () => void;
}

const CascaderCard: React.SFC<CascaderCardProps> = (props) => {
    const {
        options,
        optionTitles,
        selectedOptions,
        onSelect,
        optionsTier,
        activeOption,
        onKeyDown,
        onOptionMouseEnter,
        onOptionMouseLeave
    } = props;
    const renderOptions = selectedOptions.length === 0
        ? options
        : selectedOptions[
            selectedOptions.length === optionsTier
                ? optionsTier - 2
                : selectedOptions.length - 1
        ].children || [];

    return (
        <div className={preClass('cascader-card')} tabIndex={0} onKeyDown={onKeyDown}>
            <ul className={preClass('cascader-card-tier-title')}>
                {
                    Array.isArray(optionTitles) &&
                    optionTitles.map((title, key) => {
                        const disabled = selectedOptions.length < key;
                        const active = selectedOptions.length === key
                            || (
                                selectedOptions.length === optionsTier
                                && selectedOptions.length - 1 === key
                            );
                        const titleClass = classNames({
                            [preClass('cascader-card-title')]: true,
                            [preClass('cascader-card-disabled')]: disabled,
                            [preClass('cascader-card-active')]: active
                        });

                        return (
                            <li
                                key={key}
                                onClick={disabled ? null : onSelect.bind(this, undefined, key + 1)}
                                className={titleClass}>
                                { title }
                            </li>
                        );
                    })
                }
            </ul>
            <dl className={preClass('cascader-card-selector')}>
                {
                    renderOptions.map((option: Option, key: number) => {
                        const { value, label, disabled } = option;
                        const selected = selectedOptions.some((item) => item.value === value);
                        const optionClass = classNames({
                            [preClass('cascader-card-option')]: true,
                            [preClass('cascader-card-active')]: isExist(activeOption)
                                && activeOption.value === value,
                            [preClass('cascader-card-selected')]: selected,
                            [preClass('cascader-card-disabled')]: disabled
                        });

                        return (
                            <dd
                                className={optionClass}
                                key={key}
                                onMouseEnter={disabled ? null : onOptionMouseEnter.bind(this, option)}
                                onMouseLeave={disabled ? null : onOptionMouseLeave}
                                onClick={disabled ? null : onSelect.bind(this, option, selectedOptions.length + 1)}>
                                { label }
                            </dd>
                        );
                    })
                }
            </dl>
        </div>
    );
};

export default CascaderCard;
