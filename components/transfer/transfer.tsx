import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isEqual } from '../utils';
import Button from '../button';
import { I18nReceiver, I18nTransferInterface } from '../i18n';
import TransferModel from './transfer-model';
import { perfectDataIndex, compuntedSelectedIndexs } from './tool';

export interface Record {
    index?: React.ReactText;
    title: React.ReactText;
    disabled?: boolean;
    guessers?: string[];
    [ key: string ]: any;
}

export type Data = Record[];

export type Mode = 'source' | 'target';

export interface TransferProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    data: Data;
    defaultValue?: React.ReactText[];
    value?: React.ReactText[];
    formatter?: (record: Record) => React.ReactNode;
    selectedIndexs?: React.ReactText[];
    titles?: string[];
    searchable?: boolean;
    onSearch?: (value: string, mode: Mode) => void;
    filterOption?: (data: Data, searchVal: string, mode: Mode) => Data;
    searchPlaceholder?: string;
    noDataDescription?: React.ReactNode;
    noDataImg?: string;
    noDataImgStyle?: React.CSSProperties;
    onChange?: (indexs: React.ReactText[]) => void;
    listStyle?: React.CSSProperties;
    operations?: React.ReactNode[];
    onSelectChange?: (sourceIndexs: React.ReactText[], targetIndexs: React.ReactText[]) => void;
    sourceFooter?: React.ReactNode;
    targetFooter?: React.ReactNode;
    disabled?: boolean;
}

export interface TransferState {
    result: React.ReactText[];
    renderData: Data;
    sourceSelectedIndexs: React.ReactText[];
    targetSelectedIndexs: React.ReactText[];
}

class Transfer extends React.PureComponent<TransferProps, TransferState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        tabIndex: PropTypes.number,
        data: PropTypes.array.isRequired,
        value: PropTypes.array,
        defaultValue: PropTypes.array,
        formatter: PropTypes.func,
        selectedIndexs: PropTypes.array,
        titles: PropTypes.array,
        searchable: PropTypes.bool,
        onSearch: PropTypes.func,
        filterOption: PropTypes.func,
        searchPlaceholder: PropTypes.string,
        noDataDescription: PropTypes.string,
        noDataImg: PropTypes.string,
        noDataImgStyle: PropTypes.object,
        onChange: PropTypes.func,
        listStyle: PropTypes.object,
        operations: PropTypes.array,
        onSelectChange: PropTypes.func,
        sourceFooter: PropTypes.node,
        targetFooter: PropTypes.node,
        disabled: PropTypes.bool
    };

    public static defaultProps = {
        tabIndex: 0,
        searchable: false,
        value: [],
        defaultValue: [],
        selectedIndexs: [],
        operations: ['>', '<'],
        disabled: false
    };

    public constructor(props: TransferProps) {
        super(props);

        const result = isExist(props.value) ? props.value : props.defaultValue;

        this.state = {
            result,
            renderData: perfectDataIndex(props.data),
            ...compuntedSelectedIndexs(props.selectedIndexs, result)
        };

        [
            'onSourceSelectChangeHandler',
            'onTargetSelectChangeHandler',
            'moveToTarget',
            'moveToSource'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: TransferProps) {
        if (!isEqual(preProps.value, this.props.value) && !isEqual(this.state.result, this.props.value)) {
            this.setState({ result: this.props.value });
        }

        if (!isEqual(preProps.selectedIndexs, this.props.selectedIndexs)) {
            this.setState({
                ...compuntedSelectedIndexs(this.props.selectedIndexs, this.state.result)
            });
        }

        if (!isEqual(preProps.data, this.props.data)) {
            this.setState({ renderData: perfectDataIndex(this.props.data) });
        }
    }

    private onSourceSelectChangeHandler(list: number[]) {
        this.setState({ sourceSelectedIndexs: list });

        if (this.props.onSelectChange) {
            this.props.onSelectChange(list, this.state.targetSelectedIndexs);
        }
    }

    private onTargetSelectChangeHandler(list: number[]) {
        this.setState({ targetSelectedIndexs: list });

        if (this.props.onSelectChange) {
            this.props.onSelectChange(this.state.sourceSelectedIndexs, list);
        }
    }

    private moveToTarget() {
        const { onChange } = this.props;
        const { sourceSelectedIndexs } = this.state;
        const result = this.state.result.concat(sourceSelectedIndexs);

        this.setState({
            result,
            sourceSelectedIndexs: []
        });

        if (onChange) {
            onChange(result);
        }
    }

    private moveToSource() {
        const { onChange } = this.props;
        const { targetSelectedIndexs } = this.state;

        const result = [];

        this.state.result.forEach((index) => {
            if (!targetSelectedIndexs.includes(index)) {
                result.push(index);
            }
        });
        this.setState({
            result,
            targetSelectedIndexs: []
        });

        if (onChange) {
            onChange(result);
        }
    }

    public render() {
        const {
            className,
            style,
            searchable,
            searchPlaceholder,
            operations,
            titles,
            sourceFooter,
            targetFooter,
            listStyle,
            noDataDescription,
            noDataImg,
            noDataImgStyle,
            formatter,
            disabled,
            onSearch,
            filterOption,
            tabIndex
        } = this.props;
        const { result, renderData, sourceSelectedIndexs, targetSelectedIndexs } = this.state;

        const componentClass = classNames({
            [preClass('transfer')]: true,
            [preClass('transfer-disabled')]: disabled,
            [className]: isExist(className)
        });

        return (
            <I18nReceiver module='Transfer'>
                {
                    (i18n: I18nTransferInterface) => (
                        <section className={componentClass} style={style} tabIndex={disabled ? -1 : tabIndex}>
                            <TransferModel
                                searchable={searchable}
                                searchPlaceholder={searchPlaceholder || i18n.searchPlaceholder}
                                title={isExist(titles) ? titles[0] : i18n.titles[0]}
                                footer={sourceFooter}
                                listStyle={listStyle}
                                data={renderData.filter((item) => {
                                    return !result.includes(item.index);
                                })}
                                selectedIndexs={sourceSelectedIndexs}
                                formatter={formatter}
                                disabled={disabled}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                mode='source'
                                onChange={this.onSourceSelectChangeHandler}
                                noDataImg={noDataImg}
                                noDataImgStyle={noDataImgStyle}
                                noDataDescription={noDataDescription || i18n.noDataDescription}/>
                            <div className={preClass('transfer-operate-wrapper')}>
                                <Button
                                    className={preClass('transfer-operate-btn')}
                                    disabled={sourceSelectedIndexs.length === 0 || disabled}
                                    onClick={this.moveToTarget}
                                    type='primary'>
                                    { operations[0] }
                                </Button>
                                <Button
                                    className={preClass('transfer-operate-btn')}
                                    disabled={targetSelectedIndexs.length === 0 || disabled}
                                    onClick={this.moveToSource}
                                    type='primary'>
                                    { operations[1] }
                                </Button>
                            </div>
                            <TransferModel
                                searchable={searchable}
                                searchPlaceholder={searchPlaceholder || i18n.searchPlaceholder}
                                title={isExist(titles) ? titles[1] : i18n.titles[1]}
                                footer={targetFooter}
                                listStyle={listStyle}
                                data={renderData.filter((item) => {
                                    return result.includes(item.index);
                                })}
                                selectedIndexs={targetSelectedIndexs}
                                formatter={formatter}
                                disabled={disabled}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                mode='target'
                                onChange={this.onTargetSelectChangeHandler}
                                noDataImg={noDataImg}
                                noDataImgStyle={noDataImgStyle}
                                noDataDescription={noDataDescription || i18n.noDataDescription}/>
                        </section>
                    )
                }
            </I18nReceiver>
        );
    }
}

export default Transfer;
