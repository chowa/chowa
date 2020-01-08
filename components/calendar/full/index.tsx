import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as moment from 'moment';
import { preClass, isEqual, doms, isExist, isSameMoment } from '../../utils';
import { I18nReceiver, I18nCalendarInterface, i18nFormatter } from '../../i18n';
import { Mode, YEAR_MODE, MONTH_MODE, WEEK_MODE, DAY_MODE } from '../calendar-mode';
import RadioGroup from '../../radio-group';
import Button from '../../button';
import ButtonGroup from '../../button-group';
import Transition from '../../transition';
import Icon from '../../icon';
import FullYear from './year';
import FullMonth from './month';
import FullWeek from './week';
import FullDay from './day';
import { CEvent } from '../tool';
import EventEditModal from './event-edit-modal';
import { SelectOptionProps } from '../../select';
import MinCalendar from '../min';

export type EventType = 'info' | 'primary' | 'danger' | 'success' | 'warning';

export interface Event {
    start: moment.Moment;
    finish: moment.Moment;
    content: string;
    category: string;
    type: EventType;
    [ key: string ]: any;
}

export interface FullCalendarProps {
    className?: string;
    style?: React.CSSProperties;
    defaultMode?: Mode;
    defaultValue?: moment.Moment;
    defaultEvents?: Event[];
    events?: Event[];
    modeSelectable?: boolean;
    dateSelectable?: boolean;
    editable?: boolean;
    appendable?: boolean;
    onDelete?: (event: Event) => void;
    onEdit?: (event: Event, index: number) => void;
    onAppend?: (event: Event) => void;
    categories: SelectOptionProps[];
}

export interface FullCalendarState {
    activeMode: Mode;
    selfValue: moment.Moment;
    includeCurrentDay: boolean;
    renderEvents: Event[];
    contextmenuVisible: boolean;
    contextmenuStyle: React.CSSProperties;
    contextmenuInfo: { mom: moment.Moment; event: CEvent };
    editModalVisible: boolean;
}

class FullCalendar extends React.PureComponent<FullCalendarProps, FullCalendarState> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        defaultMode: PropTypes.oneOf([YEAR_MODE, MONTH_MODE, WEEK_MODE, DAY_MODE]),
        defaultValue: PropTypes.object,
        defaultEvents: PropTypes.array,
        events: PropTypes.array,
        modeSelectable: PropTypes.bool,
        dateSelectable: PropTypes.bool,
        editable: PropTypes.bool,
        appendable: PropTypes.bool
    };

    public static defaultProps = {
        defaultMode: MONTH_MODE,
        modeSelectable: true,
        dateSelectable: true,
        editable: false,
        appendable: false
    };

    public static Min = MinCalendar;

    private wrapperEle: HTMLElement;

    public constructor(props: FullCalendarProps) {
        super(props);

        this.state = {
            activeMode: props.defaultMode,
            selfValue: moment.isMoment(props.defaultValue)
                ? props.defaultValue
                : moment(),
            includeCurrentDay: true,
            renderEvents: props.events || props.defaultEvents,
            contextmenuVisible: false,
            contextmenuStyle: undefined,
            contextmenuInfo: {
                mom: undefined,
                event: undefined
            },
            editModalVisible: false
        };

        [
            'onModeChangeHandler',
            'prePageHandler',
            'nextPageHandler',
            'selectCurrentDay',
            'onContextMenuHandler',
            'autoHideContextmenu',
            'showEditModal',
            'hiddenEditModal',
            'deleteEvent',
            'appendHandler',
            'editHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    public componentDidUpdate(preProps: FullCalendarProps, preState: FullCalendarState) {
        if (!isEqual(preProps.events, this.props.events) && !isEqual(this.props.events, this.state.renderEvents)) {
            this.setState({ renderEvents: this.props.events });
        }

        if (!isSameMoment(preState.selfValue, this.state.selfValue)) {
            let includeCurrentDay = false;
            const { selfValue, activeMode } = this.state;
            const currentValue = moment();

            switch (activeMode) {
                case YEAR_MODE:
                    includeCurrentDay = currentValue.isSame(selfValue, 'year');
                    break;

                case MONTH_MODE:
                    includeCurrentDay = currentValue.isSame(selfValue, 'month');
                    break;

                case WEEK_MODE:
                    includeCurrentDay = currentValue.isSame(selfValue, 'week');
                    break;

                case DAY_MODE:
                    includeCurrentDay = currentValue.isSame(selfValue, 'day');
                    break;
            }

            this.setState({
                includeCurrentDay
            });
        }
    }

    private selectCurrentDay() {
        this.setState({ selfValue: moment() });
    }

    private prePageHandler() {
        const { selfValue, activeMode } = this.state;
        const newValue = selfValue.clone();

        switch (activeMode) {
            case YEAR_MODE:
                return this.setState({
                    selfValue: newValue.subtract(1, 'year')
                });

            case MONTH_MODE:
                return this.setState({
                    selfValue: newValue.subtract(1, 'month')
                });

            case WEEK_MODE:
                return this.setState({
                    selfValue: newValue.subtract(1, 'week')
                });

            case DAY_MODE:
                return this.setState({
                    selfValue: newValue.subtract(1, 'day')
                });
        }
    }

    private nextPageHandler() {
        const { selfValue, activeMode } = this.state;
        const newValue = selfValue.clone();

        switch (activeMode) {
            case YEAR_MODE:
                return this.setState({
                    selfValue: newValue.add(1, 'year')
                });

            case MONTH_MODE:
                return this.setState({
                    selfValue: newValue.add(1, 'month')
                });

            case WEEK_MODE:
                return this.setState({
                    selfValue: newValue.add(1, 'week')
                });

            case DAY_MODE:
                return this.setState({
                    selfValue: newValue.add(1, 'day')
                });
        }
    }

    private onModeChangeHandler(mode: Mode) {
        this.setState({ activeMode: mode });
    }

    private getDisplayDate(i18n: I18nCalendarInterface) {
        const { selfValue, activeMode } = this.state;
        const replacer = { weeks: selfValue.week() };

        switch (activeMode) {
            case YEAR_MODE:
                return selfValue.format(i18n.yearFormat);

            case MONTH_MODE:
                return selfValue.format(i18n.monthFormat);

            case WEEK_MODE:
                return `${selfValue.format(i18n.yearFormat)} ${i18nFormatter(i18n.weeksFormat, replacer)}`;

            case DAY_MODE:
                return selfValue.format(i18n.dayFormat);
        }
    }

    private onContextMenuHandler(mom: moment.Moment, event: CEvent, e: React.MouseEvent) {
        const { left, top } = doms.offset(this.wrapperEle);

        this.setState({
            contextmenuVisible: true,
            contextmenuStyle: {
                left: e.pageX - left,
                top: e.pageY - top
            },
            contextmenuInfo: {
                mom,
                event
            }
        }, () => {
            doms.on(this.wrapperEle, 'click', this.autoHideContextmenu);
        });

        e.preventDefault();
    }

    private autoHideContextmenu() {
        this.setState({ contextmenuVisible: false });

        doms.off(this.wrapperEle, 'click', this.autoHideContextmenu);
    }

    private showEditModal() {
        this.setState({ editModalVisible: true });
    }

    private hiddenEditModal() {
        this.setState({ editModalVisible: false });
    }

    private deleteEvent() {
        const { contextmenuInfo, renderEvents } = this.state;
        const { onDelete } = this.props;
        const newRenderEvents: Event[] = [].concat(renderEvents);
        const deleteEvent = newRenderEvents.splice(contextmenuInfo.event.eventIndex, 1).pop();

        this.setState({
            renderEvents: newRenderEvents
        });

        if (onDelete) {
            onDelete(deleteEvent);
        }
    }

    private appendHandler(event: Event) {
        const renderEvents = [].concat(this.state.renderEvents);
        renderEvents.push(event);

        this.setState({ renderEvents });

        if (this.props.onAppend) {
            this.props.onAppend(event);
        }
    }

    private editHandler(event: Event) {
        const { contextmenuInfo } = this.state;
        const renderEvents = [].concat(this.state.renderEvents);

        renderEvents[contextmenuInfo.event.eventIndex] = {
            ...renderEvents[contextmenuInfo.event.eventIndex],
            ...event
        };

        this.setState({ renderEvents });

        if (this.props.onEdit) {
            this.props.onEdit(renderEvents[contextmenuInfo.event.eventIndex], contextmenuInfo.event.eventIndex);
        }
    }

    public render() {
        const { modeSelectable, dateSelectable, editable, appendable, categories, style, className } = this.props;
        const {
            activeMode,
            includeCurrentDay,
            selfValue,
            renderEvents,
            contextmenuVisible,
            contextmenuStyle,
            contextmenuInfo,
            editModalVisible
        } = this.state;

        const componentClass = classNames({
            [preClass('full-calendar')]: true,
            [className]: isExist(className)
        });

        return (
            <section style={style} className={componentClass} ref={(ele) => {
                this.wrapperEle = ele;
            }}>
                <div className={preClass('full-calendar-toolbar')}>
                    {
                        modeSelectable &&
                        <I18nReceiver module='Calendar'>
                            {
                                (i18n: I18nCalendarInterface) => (
                                    <RadioGroup
                                        className={preClass('full-calendar-mode-selector')}
                                        value={activeMode}
                                        btn={true}
                                        onChange={this.onModeChangeHandler}
                                        options={[
                                            {
                                                label: i18n.year,
                                                value: YEAR_MODE
                                            },
                                            {
                                                label: i18n.month,
                                                value: MONTH_MODE
                                            },
                                            {
                                                label: i18n.week,
                                                value: WEEK_MODE
                                            },
                                            {
                                                label: i18n.day,
                                                value: DAY_MODE
                                            }
                                        ]}/>
                                )
                            }
                        </I18nReceiver>
                    }
                    {
                        dateSelectable &&
                        <div className={preClass('full-calendar-changer')}>
                            <Button disabled={includeCurrentDay} onClick={this.selectCurrentDay}>
                                <I18nReceiver module='Calendar'>
                                    { (i18n: I18nCalendarInterface) => i18n.today }
                                </I18nReceiver>
                            </Button>
                            <ButtonGroup>
                                <Button onClick={this.prePageHandler}>
                                    <Icon type='arrow-left'/>
                                </Button>
                                <Button onClick={this.nextPageHandler}>
                                    <Icon type='arrow-right'/>
                                </Button>
                            </ButtonGroup>
                        </div>
                    }
                    <h3 className={preClass('full-calendar-date')}>
                        <I18nReceiver module='Calendar'>
                            { (i18n: I18nCalendarInterface) => this.getDisplayDate(i18n) }
                        </I18nReceiver>
                    </h3>
                </div>
                {
                    activeMode === YEAR_MODE &&
                    <FullYear
                        onContextMenu={this.onContextMenuHandler}
                        events={renderEvents}
                        value={selfValue}
                        editable={editable}
                        appendable={appendable}/>
                }
                {
                    activeMode === MONTH_MODE &&
                    <FullMonth
                        onContextMenu={this.onContextMenuHandler}
                        events={renderEvents}
                        value={selfValue}
                        editable={editable}
                        appendable={appendable}/>
                }
                {
                    activeMode === WEEK_MODE &&
                    <FullWeek
                        onContextMenu={this.onContextMenuHandler}
                        events={renderEvents}
                        value={selfValue}
                        editable={editable}
                        appendable={appendable}/>
                }
                {
                    activeMode === DAY_MODE &&
                    <FullDay
                        onContextMenu={this.onContextMenuHandler}
                        events={renderEvents}
                        value={selfValue}
                        editable={editable}
                        appendable={appendable}/>
                }
                {
                    (editable || appendable) &&
                    <Transition visible={contextmenuVisible}>
                        <div className={preClass('full-calendar-contextmenu')} style={contextmenuStyle}>
                            <ul className={preClass('full-calendar-menu')}>
                                {
                                    contextmenuInfo.event === undefined &&
                                    <li className={preClass('full-calendar-menu-item')} onClick={this.showEditModal}>
                                        <I18nReceiver module='Calendar'>
                                            { (i18n: I18nCalendarInterface) => i18n.contextmenu.createEvent }
                                        </I18nReceiver>
                                    </li>
                                }
                                {
                                    !moment.isMoment(contextmenuInfo.mom) &&
                                    <li className={preClass('full-calendar-menu-item')} onClick={this.showEditModal}>
                                        <I18nReceiver module='Calendar'>
                                            { (i18n: I18nCalendarInterface) => i18n.contextmenu.editEvent }
                                        </I18nReceiver>
                                    </li>
                                }
                                {
                                    !moment.isMoment(contextmenuInfo.mom) &&
                                    <li className={preClass('full-calendar-menu-item')} onClick={this.deleteEvent}>
                                        <I18nReceiver module='Calendar'>
                                            { (i18n: I18nCalendarInterface) => i18n.contextmenu.removeEvent }
                                        </I18nReceiver>
                                    </li>
                                }
                            </ul>
                        </div>
                    </Transition>
                }
                {
                    (editable || appendable) &&
                    <EventEditModal
                        createMom={contextmenuInfo.mom}
                        editEvent={contextmenuInfo.event}
                        onAppend={this.appendHandler}
                        onEdit={this.editHandler}
                        hiddenEditModal={this.hiddenEditModal}
                        categories={categories}
                        mode={activeMode}
                        visible={editModalVisible}/>
                }
            </section>
        );
    }
}

export default FullCalendar;
