import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { preClass, isExist } from '../utils';
import Icon from '../icon';
import Select from '../select';
import Input from '../input';
import { I18nReceiver, I18nPaginationInterface } from '../i18n';

export interface PaginationProps {
    className?: string;
    style?: React.CSSProperties;
    pageSize?: number;
    total: number;
    withQuickJumper?: boolean;
    onChange?: (pageNumber: number) => void;
    current?: number;
    hideOnSinglePage?: boolean;
    preBtnText?: string;
    nextBtnText?: string;
    justify?: 'start' | 'end' | 'center';
    compact?: boolean;
    bordered?: boolean;
    pageBtnAmount?: number;
    pageSizeOptions?: number[];
    pageSizeUnit?: string;
    onPageSizeChange?: (pageSize: number) => void;
    simple?: boolean;
}

export interface PaginationState {
    selfPageNumber: number;
    selfPageSize: number;
    pageTotal: number;
    jumpPageNumber: number;
}

class Pagination extends React.PureComponent<PaginationProps, PaginationState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        pageSize: PropTypes.number,
        total: PropTypes.number.isRequired,
        withQuickJumper: PropTypes.bool,
        onChange: PropTypes.func,
        current: PropTypes.number,
        hideOnSinglePage: PropTypes.bool,
        preBtnText: PropTypes.string,
        nextBtnText: PropTypes.string,
        justify: PropTypes.oneOf(['start', 'end', 'center']),
        compact: PropTypes.bool,
        bordered: PropTypes.bool,
        pageBtnAmount: PropTypes.number,
        pageSizeOptions: PropTypes.array,
        pageSizeUnit: PropTypes.string,
        onPageSizeChange: PropTypes.func,
        simple: PropTypes.bool
    };

    public static defaultProps = {
        pageSize: 10,
        withQuickJumper: false,
        current: 1,
        hideOnSinglePage: false,
        justify: 'end',
        compact: false,
        bordered: true,
        pageBtnAmount: 5,
        simple: false
    };

    public constructor(props: PaginationProps) {
        super(props);

        this.state = {
            selfPageNumber: props.current,
            selfPageSize: props.pageSize,
            pageTotal: Math.ceil(props.total / props.pageSize),
            jumpPageNumber: props.simple ? props.current : 0
        };

        [
            'goPrePage',
            'goNextPage',
            'goPrePageByBtnSize',
            'goNextPageByBtnSize',
            'pageChange',
            'onKeyDownHandler',
            'onBlurHandler',
            'onChangeHandler',
            'pageSizeChangeHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: PaginationProps) {
        if (preProps.pageSize !== this.props.pageSize && this.props.pageSize !== this.state.selfPageSize) {
            this.setState({
                selfPageSize: this.props.pageSize,
                pageTotal: Math.ceil(this.props.total / this.props.pageSize)
            });
        }

        if (preProps.total !== this.props.total) {
            this.setState({
                pageTotal: Math.ceil(this.props.total / this.state.selfPageSize)
            });
        }

        if (preProps.current !== this.props.current && this.props.current !== this.state.selfPageSize) {
            this.setState({
                selfPageNumber: this.props.current > this.state.pageTotal
                    ? this.state.pageTotal
                    : this.props.current
            });
        }
    }

    private pageSizeChangeHandler(pageSize: number) {
        const { total, onPageSizeChange } = this.props;
        const pageTotal = Math.ceil(total / pageSize);

        this.setState({
            pageTotal,
            selfPageSize: pageSize,
            selfPageNumber: this.state.selfPageNumber > pageTotal
                ? pageTotal
                : this.state.selfPageNumber
        }, () => {
            if (onPageSizeChange) {
                onPageSizeChange(pageSize);
            }
        });
    }

    private goPrePage() {
        const { selfPageNumber } = this.state;

        if (selfPageNumber === 1) {
            return;
        }

        this.pageChange(selfPageNumber - 1);
    }

    private goNextPage() {
        const { selfPageNumber, pageTotal } = this.state;

        if (selfPageNumber === pageTotal) {
            return;
        }

        this.pageChange(selfPageNumber + 1);
    }

    private goPrePageByBtnSize() {
        const { pageBtnAmount } = this.props;
        const { selfPageNumber } = this.state;
        const current = selfPageNumber - pageBtnAmount;

        this.pageChange(current < 1 ? 1 : current);
    }

    private goNextPageByBtnSize() {
        const { pageBtnAmount } = this.props;
        const { pageTotal, selfPageNumber } = this.state;
        const current = selfPageNumber + pageBtnAmount;

        this.pageChange(current > pageTotal ? pageTotal : current);
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (!/^\d+$/.test(e.target.value) && e.target.value !== '') {
            return;
        }

        this.setState({
            jumpPageNumber: Number(e.target.value)
        });
    }

    private onKeyDownHandler(e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            this.onBlurHandler();
        }
    }

    private onBlurHandler() {
        const { simple } = this.props;
        const { jumpPageNumber, pageTotal, selfPageNumber } = this.state;

        if (jumpPageNumber <= pageTotal && jumpPageNumber > 0) {
            this.pageChange(jumpPageNumber);
        }
        else {
            this.setState({
                jumpPageNumber: simple ? selfPageNumber : 0
            });
        }
    }

    private pageChange(current: number) {
        const { onChange, simple } = this.props;

        this.setState({
            selfPageNumber: current,
            jumpPageNumber: simple ? current : 0
        });

        if (onChange) {
            onChange(current);
        }
    }

    public render() {
        const {
            className,
            style,
            withQuickJumper,
            justify,
            compact,
            bordered,
            pageBtnAmount,
            preBtnText,
            nextBtnText,
            hideOnSinglePage,
            pageSizeOptions,
            pageSizeUnit,
            simple
        } = this.props;
        const { selfPageNumber, selfPageSize, pageTotal, jumpPageNumber } = this.state;

        if (hideOnSinglePage && pageTotal === 1) {
            return null;
        }

        const componentClass = classNames({
            [preClass('pagination')]: true,
            [preClass('pagination-bordered')]: bordered && !simple,
            [preClass('pagination-compact')]: compact,
            [preClass(`pagination-${justify}`)]: true,
            [className]: isExist(className)
        });

        const forwardBtnClass = classNames({
            [preClass('pagination-btn')]: true,
            [preClass('pagination-forward-btn')]: true
        });

        const preBtnClass = classNames({
            [preClass('pagination-btn')]: true,
            [preClass('pagination-disabled')]: selfPageNumber === 1
        });

        const nextBtnClass = classNames({
            [preClass('pagination-btn')]: true,
            [preClass('pagination-disabled')]: selfPageNumber === pageTotal
        });

        const pageNodes = [];

        if (!simple) {
            const halfpageBtnAmount = Math.floor(pageBtnAmount / 2);
            let startLoop = selfPageNumber <= halfpageBtnAmount ? 1 : selfPageNumber - halfpageBtnAmount;
            let endLoop = startLoop + pageBtnAmount - 1;

            if (endLoop > pageTotal) {
                endLoop = pageTotal;
                startLoop = pageTotal > pageBtnAmount ? pageTotal - pageBtnAmount : 1;
            }

            if (startLoop > 1) {
                pageNodes.push(
                    <li
                        key={'pagination-btn-start'}
                        className={preClass('pagination-btn')}
                        onClick={this.pageChange.bind(this, 1)}>
                        <span>1</span>
                    </li>
                );
            }
            if (startLoop > 2) {
                pageNodes.push(
                    <li
                        key={'pre-btn-size'}
                        className={forwardBtnClass}
                        onClick={this.goPrePageByBtnSize}>
                        <Icon type='omit'/>
                        <Icon type='arrow-left-double'/>
                    </li>
                );
            }

            for (let i = startLoop; i <= endLoop; i++) {
                const btnClass = classNames({
                    [preClass('pagination-btn')]: true,
                    [preClass('pagination-selected')]: selfPageNumber === i
                });

                pageNodes.push(
                    <li
                        key={i}
                        className={btnClass}
                        onClick={selfPageNumber === i ? null : this.pageChange.bind(this, i)}>
                        <span>{ i }</span>
                    </li>
                );
            }

            if (endLoop !== pageTotal) {
                pageNodes.push(
                    <li
                        key={'next-btn-size'}
                        className={forwardBtnClass}
                        onClick={this.goNextPageByBtnSize}>
                        <Icon type='omit'/>
                        <Icon type='arrow-right-double'/>
                    </li>
                );

                pageNodes.push(
                    <li
                        key={'pagination-btn-end'}
                        className={preClass('pagination-btn')}
                        onClick={this.pageChange.bind(this, pageTotal)}>
                        <span>{ pageTotal }</span>
                    </li>
                );
            }
        }

        return (
            <section className={componentClass} style={style}>
                <ul className={preClass('pagination-wrapper')}>
                    {
                        pageTotal > 1 &&
                        <li onClick={this.goPrePage} className={preBtnClass}>
                            { !preBtnText && <Icon type='arrow-left'/> }
                            { preBtnText && <span>{ preBtnText }</span> }
                        </li>
                    }
                    { !simple && pageNodes }
                    {
                        simple &&
                        <li className={preClass('pagination-simple-jumper')}>
                            <Input
                                className={preClass('pagination-input')}
                                type='text'
                                value={jumpPageNumber}
                                onKeyDown={this.onKeyDownHandler}
                                onBlur={this.onBlurHandler}
                                onChange={this.onChangeHandler}
                                placeholder=''/>
                            <span className={preClass('pagination-simple-separator')}>/</span>
                            <span>{ pageTotal }</span>
                        </li>
                    }
                    {
                        pageTotal > 1 &&
                        <li onClick={this.goNextPage} className={nextBtnClass}>
                            { nextBtnText && <span>{nextBtnText}</span> }
                            { !nextBtnText && <Icon type='arrow-right'/> }
                        </li>
                    }
                </ul>
                {
                    withQuickJumper && pageTotal > 1 && !simple &&
                    <div className={preClass('pagination-quick-jumper')}>
                        <span className={preClass('pagination-text')}>跳至</span>
                        <Input
                            className={preClass('pagination-input')}
                            type='text'
                            value={jumpPageNumber === 0 ? '' : jumpPageNumber}
                            onKeyDown={this.onKeyDownHandler}
                            onBlur={this.onBlurHandler}
                            onChange={this.onChangeHandler}
                            placeholder=''/>
                        <span className={preClass('pagination-text')}>页</span>
                    </div>
                }
                {
                    isExist(pageSizeOptions) &&
                    <div className={preClass('pagination-page-size')}>
                        <Select value={selfPageSize} onChange={this.pageSizeChangeHandler}>
                            {
                                pageSizeOptions.map((num, key) => (
                                    <Select.Option value={num} key={key}>
                                        { num }
                                        <I18nReceiver module='Pagination'>
                                            { (i18n: I18nPaginationInterface) => pageSizeUnit || i18n.pageSizeUnit }
                                        </I18nReceiver>
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                }
            </section>
        );
    }
}

export default Pagination;
