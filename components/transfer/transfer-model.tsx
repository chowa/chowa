import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist, isEqual, hasProperty } from '../utils';
import { Data, Record, Mode } from './transfer';
import Input from '../input';
import Checkbox from '../checkbox';
import Icon from '../icon';
import NoData from '../no-data';

export interface TransferModelProps {
    data: Data;
    formatter: (record: Record) => React.ReactNode;
    title: React.ReactNode;
    searchable: boolean;
    searchPlaceholder: string;
    noDataDescription: React.ReactNode;
    noDataImg: string;
    noDataImgStyle: React.CSSProperties;
    onChange: (indexs: React.ReactText[]) => void;
    listStyle: React.CSSProperties;
    footer: React.ReactNode;
    selectedIndexs: React.ReactText[];
    onSearch: (value: string, mode: Mode) => void;
    filterOption: (data: Data, searchVal: string, mode: Mode) => Data;
    mode: Mode;
    disabled: boolean;
}

export interface TransferModelState {
    searchVal: string;
    selectAll: boolean;
    renderData: Data;
}

class TransferModel extends React.PureComponent<TransferModelProps, TransferModelState> {

    public static propTypes = {
        data: PropTypes.array.isRequired,
        formatter: PropTypes.func,
        title: PropTypes.node,
        searchable: PropTypes.bool,
        searchPlaceholder: PropTypes.string,
        noDataDescription: PropTypes.string,
        onChange: PropTypes.func,
        listStyle: PropTypes.object,
        footer: PropTypes.node,
        selectedIndexs: PropTypes.array,
        onSearch: PropTypes.func,
        filterOption: PropTypes.func,
        mode: PropTypes.string,
        disabled: PropTypes.bool
    };

    public constructor(props: TransferModelProps) {
        super(props);

        this.state = {
            searchVal: '',
            selectAll: false,
            renderData: props.data
        };

        [
            'onSearchInputChangeHandler',
            'onSelectAllChangeHandler',
            'selectItemHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private getFilterRenderData(searchVal: string): Data {
        const { filterOption, mode, data } = this.props;

        let renderData: Data = [].concat(data);
        if (searchVal) {
            if (filterOption) {
                renderData = filterOption(renderData, searchVal, mode);
            }
            else {
                renderData = renderData.filter((item) => {
                    return item.title.toString().indexOf(searchVal) > -1
                        || (
                            hasProperty(item, 'guessers')
                            && item.guessers.some((guesser: string) => guesser.indexOf(searchVal) > -1)
                        );
                });
            }
        }

        return renderData;
    }

    private onSearchInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const searchVal = e.target.value;

        this.setState({
            searchVal,
            renderData: this.getFilterRenderData(searchVal)
        });

        if (this.props.onSearch) {
            this.props.onSearch(e.target.value, this.props.mode);
        }
    }

    private onSelectAllChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChange } = this.props;
        const { renderData } = this.state;
        const selectAll = e.target.checked;

        this.setState({
            selectAll
        });

        const newSelectIndexs = [];

        if (selectAll) {
            renderData.forEach((item) => {
                if (!item.disabled) {
                    newSelectIndexs.push(item.index);
                }
            });
        }

        onChange(newSelectIndexs);
    }

    private selectItemHandler(item: Record, e: React.ChangeEvent<HTMLInputElement>) {
        const { selectedIndexs, onChange } = this.props;
        const newSelectIndexs = [].concat(selectedIndexs);

        if (e.target.checked) {
            newSelectIndexs.push(item.index);
        }
        else {
            newSelectIndexs.splice(newSelectIndexs.indexOf(item.index), 1);
        }

        onChange(newSelectIndexs);
    }

    public componentDidUpdate(preProps: TransferModelProps) {
        if (preProps.selectedIndexs.length !== this.props.selectedIndexs.length) {
            const { selectedIndexs } = this.props;
            const { renderData } = this.state;
            let disabledCount = 0;
            let selectCount = 0;

            renderData.forEach((item) => {
                if (item.disabled) {
                    return disabledCount++;
                }
                if (selectedIndexs.includes(item.index)) {
                    selectCount++;
                }
            });

            this.setState({
                selectAll: renderData.length === disabledCount + selectCount
                    && renderData.length !== disabledCount
            });
        }

        if (!isEqual(preProps.data, this.props.data)) {
            this.setState({ renderData: this.getFilterRenderData(this.state.searchVal) });
        }
    }

    public render() {
        const {
            searchable,
            footer,
            title,
            listStyle,
            searchPlaceholder,
            formatter,
            noDataDescription,
            noDataImg,
            noDataImgStyle,
            selectedIndexs,
            disabled
        } = this.props;
        const { searchVal, selectAll, renderData } = this.state;

        return (
            <div className={preClass('transfer-model')} style={listStyle}>
                <div className={preClass('transfer-model-header')}>
                    <Checkbox
                        checked={selectAll}
                        tabIndex={-1}
                        indeterminate={!selectAll && selectedIndexs.length > 0}
                        disabled={disabled || renderData.length === 0}
                        onChange={this.onSelectAllChangeHandler}
                        label={`${selectedIndexs.length > 0 ? selectedIndexs.length + '/' : ''}${renderData.length}项`}/>
                    <span className={preClass('transfer-model-title')}>
                        { title }
                    </span>
                </div>
                <div className={preClass('transfer-model-body')}>
                    {
                        searchable &&
                        <div className={preClass('transfer-search-wrapper')}>
                            <Input
                                prefix={<Icon type='search'/>}
                                tabIndex={-1}
                                type='text'
                                disabled={disabled}
                                onChange={this.onSearchInputChangeHandler}
                                value={searchVal}
                                clearable={true}
                                placeholder={searchPlaceholder}/>
                        </div>
                    }
                    <ul className={preClass('transfer-selector-wrapper')}>
                        {
                            renderData.map((item) => {
                                const itemClass = classNames({
                                    [preClass('transfer-item')]: true,
                                    [preClass('transfer-item-disabled')]: item.disabled || disabled
                                });

                                return (
                                    <li
                                        key={item.index}
                                        className={itemClass}>
                                        <Checkbox
                                            tabIndex={-1}
                                            onChange={this.selectItemHandler.bind(this, item)}
                                            disabled={item.disabled || disabled}
                                            checked={!item.disabled && selectedIndexs.includes(item.index)}
                                            label={isExist(formatter) ? formatter(item) : item.title}/>
                                    </li>
                                );
                            })
                        }
                        {
                            renderData.length === 0 && searchVal &&
                            <li className={preClass('transfer-empty')}>
                                <NoData description={noDataDescription} img={noDataImg} imgStyle={noDataImgStyle}/>
                            </li>
                        }
                    </ul>
                </div>
                {
                    footer &&
                    <div className={preClass('transfer-model-footer')}>{ footer }</div>
                }
            </div>
        );
    }
}

export default TransferModel;
