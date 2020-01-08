import * as React from 'react';
import classNames from 'classnames';
import { preClass, isEqual, isExist } from '../utils';
import { DataIndex } from './table-column';
import { UpdateParams, FilterInfo } from './table';
import Dropdown from '../dropdown';
import Icon from '../icon';
import RadioGroup, { Option } from '../radio-group';
import CheckboxGroup from '../checkbox-group';
import Button from '../button';

export interface Filter {
    label: React.ReactText;
    value: React.ReactText;
}

export interface TableFilterProps {
    filtered?: boolean;
    filterValues?: React.ReactText[];
    filters?: Filter[] | React.ReactText[];
    filterMultiple?: boolean;
    filterMethod?: (dataIndex: DataIndex, values: React.ReactText[]) => any;
    dataIndex: DataIndex;
    activeFilter: FilterInfo;
    updateTable: (params: UpdateParams) => void;
}

export interface TableFilterState {
    filterVisible: boolean;
    selfFilterValues: React.ReactText[];
    filterValue: React.ReactText;
}

class TableFilter extends React.PureComponent<TableFilterProps, TableFilterState> {

    public constructor(props: TableFilterProps) {
        super(props);

        this.state = {
            filterVisible: false,
            selfFilterValues: [],
            filterValue: undefined
        };

        [
            'onVisibleChange',
            'onMultipleFilterChange',
            'onSingleFilterChange',
            'resetFilter',
            'doFilter'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidMount() {
        if (this.props.filtered && Array.isArray(this.props.filterValues)) {
            this.setState({
                selfFilterValues: this.props.filterValues
            }, () => {
                this.doFilter();
            });
        }
    }

    public componentDidUpdate(preProps: TableFilterProps) {
        if (
            isExist(preProps.activeFilter)
            && preProps.activeFilter.dataIndex === this.props.dataIndex
            && isExist(this.props.activeFilter)
            && this.props.activeFilter.dataIndex !== this.props.dataIndex
        ) {
            this.setState({
                selfFilterValues: [],
                filterValue: undefined
            });
        }

        if (
            this.props.filtered
            && Array.isArray(this.props.filterValues)
            && !isEqual(preProps.filterValues, this.props.filterValues)
        ) {
            this.setState({
                selfFilterValues: this.props.filterValues
            }, () => {
                this.doFilter();
            });
        }
    }

    private doFilter() {
        const { filterMultiple, dataIndex, updateTable, filterMethod } = this.props;
        const { filterValue, selfFilterValues } = this.state;
        const values = filterMultiple ? selfFilterValues : [filterValue];

        if (filterMethod) {
            filterMethod(dataIndex, values);
        }
        else {
            throw new Error('Table must provide a filtering method as filterMethod');
        }

        updateTable({
            filterInfo: {
                dataIndex,
                values
            }
        });

        this.setState({ filterVisible: false });
    }

    private resetFilter() {
        const { activeFilter, dataIndex, updateTable, filterMethod } = this.props;

        if (filterMethod) {
            filterMethod(dataIndex, []);
        }
        else {
            throw new Error('Table must provide a filtering method as filterMethod');
        }

        if (isExist(activeFilter) && activeFilter.dataIndex === dataIndex) {
            updateTable({
                filterInfo: undefined
            });
        }

        this.setState({
            selfFilterValues: [],
            filterValue: undefined
        });

        this.setState({ filterVisible: false });
    }

    private onVisibleChange(v: boolean) {
        this.setState({
            filterVisible: v
        });
    }

    private onMultipleFilterChange(values: React.ReactText[]) {
        this.setState({
            selfFilterValues: values
        });
    }

    private onSingleFilterChange(value: React.ReactText) {
        this.setState({
            filterValue: value
        });
    }

    private compileFilters(): Filter[] {
        const { filters } = this.props;
        const ret = [];

        filters.forEach((filter: Filter | React.ReactText) => {
            if (typeof filter === 'object') {
                ret.push(filter);
            }
            else {
                ret.push({
                    label: filter,
                    value: filter
                });
            }
        });

        return ret;
    }

    private renderContent() {
        const { filterMultiple } = this.props;
        const { filterValue, selfFilterValues } = this.state;
        const renderFilters = this.compileFilters();
        const disabled = filterMultiple
            ? selfFilterValues.length === 0
            : filterValue === undefined;
        const selectNode = filterMultiple
            ? (<CheckboxGroup
                mode='vertical'
                value={selfFilterValues}
                onChange={this.onMultipleFilterChange}
                options={renderFilters as Option[]}/>)
            : (<RadioGroup
                mode='vertical'
                value={filterValue}
                onChange={this.onSingleFilterChange}
                options={renderFilters as Option[]}/>);

        return (
            <div className={preClass('table-filter-menu')}>
                { selectNode }
                <div className={preClass('table-filter-handler')}>
                    <Button size='small' type='primary' disabled={disabled} onClick={this.doFilter}>确定</Button>
                    <Button size='small' disabled={disabled} onClick={this.resetFilter}>重置</Button>
                </div>
            </div>
        );
    }

    public render() {
        const { filterVisible } = this.state;
        const { activeFilter, dataIndex } = this.props;

        const filterClass = classNames({
            [preClass('table-filter')]: true,
            [preClass('table-filter-active')]: filterVisible,
            [preClass('table-filtered')]: isExist(activeFilter) && activeFilter.dataIndex === dataIndex
        });

        return (
            <Dropdown
                visible={filterVisible}
                onVisibleChange={this.onVisibleChange}
                withArrow={true}
                content={this.renderContent()}
                placement='bottom'>
                <div className={filterClass}>
                    <Icon type='filter'/>
                </div>
            </Dropdown>
        );
    }
}

export default TableFilter;
