import * as React from 'react';
import * as moment from 'moment';
import classNames from 'classnames';
import { I18nReceiver, I18nCalendarInterface } from '../../i18n';
import { preClass, isEqual } from '../../utils';
import { compileRowEvents, CEvent } from '../tool';
import { Event } from './index';
import RowEventLayout from './row-event-layout';

export interface FullMonthProps {
    value: moment.Moment;
    events: Event[];
    editable: boolean;
    appendable: boolean;
    onContextMenu: (mom: moment.Moment, event: CEvent, e: React.MouseEvent) => void;
}

export interface FullMonthState {
    renderMoms: moment.Moment[][];
    renderEvents: CEvent[][][];
}

class FullMonth extends React.PureComponent<FullMonthProps, FullMonthState> {

    public constructor(props: FullMonthProps) {
        super(props);

        this.state = {
            ...this.compileRenderParams(props.value, props.events)
        };
    }

    public componentDidUpdate(preProps: FullMonthProps) {
        if (
            !preProps.value.isSame(this.props.value)
            || !isEqual(preProps.events, this.props.events)
        ) {
            this.setState({
                ...this.compileRenderParams(this.props.value, this.props.events)
            });
        }
    }

    private compileRenderParams(value: moment.Moment, events: Event[]) {
        const begin = value.clone().startOf('month');
        const end = value.clone().endOf('month');

        const startDay = begin.day() === 0 ? 6 : begin.day() - 1;
        const endDay = end.day() === 0 ? 0 : 7 - end.day();

        if (startDay > 0) {
            begin.subtract(startDay, 'day');
        }

        if (endDay > 0) {
            end.add(endDay, 'day');
        }
        const amount = end.diff(begin, 'day') + 1;
        const renderMoms = [];
        const renderEvents = [];

        for (let i = 0; i < amount / 7; i++) {
            const startIndex = i * 7;
            const rowMoms: moment.Moment[] = [];

            for (let j = 0; j < 7; j++) {
                const mom = begin.clone().add(startIndex + j, 'day');
                rowMoms.push(mom);
            }
            renderMoms.push(rowMoms);
            renderEvents.push(compileRowEvents(events, rowMoms, 'day'));
        }

        return {
            renderMoms,
            renderEvents,
            activeDay: undefined,
            activeEvent: undefined
        };
    }

    private renderDay(mom: moment.Moment, key: number) {
        const { value, appendable, onContextMenu } = this.props;
        const currentValue = moment();

        const dayClass = classNames({
            [preClass('full-calendar-num')]: true,
            [preClass('full-calendar-dark')]: !mom.isSame(value, 'month'),
            [preClass('full-calendar-active')]: mom.isSame(currentValue, 'day')
        });

        return (
            <div
                onContextMenu={appendable ? onContextMenu.bind(this, mom, undefined) : null}
                className={preClass('full-calendar-mode-detail-wrapper')}
                key={key}>
                <div className={preClass('full-calendar-mode-detail')}>
                    <span className={dayClass}>{ mom.date() }</span>
                </div>
            </div>
        );
    }

    public render() {
        const { renderMoms, renderEvents } = this.state;
        const { editable, onContextMenu } = this.props;

        const wrapperClass = classNames({
            [preClass('full-calendar-mode-wrapper')]: true,
            [preClass('full-calendar-mode-month')]: true
        });

        return (
            <div className={wrapperClass}>
                <dl className={preClass('full-calendar-header')}>
                    <I18nReceiver module='Calendar'>
                        {
                            (i18n: I18nCalendarInterface) => i18n.weeks.map((val, key) => (
                                <dd key={key} className={preClass('full-calendar-header-title')}>{ val }</dd>
                            ))
                        }
                    </I18nReceiver>
                </dl>
                <div className={preClass('full-calendar-body')}>
                    {
                        renderMoms.map((row, key) => (
                            <div className={preClass('full-calendar-row-wrapper')} key={key}>
                                <div className={preClass('full-calendar-row-bg')}>
                                    {
                                        row.map((mom, colKey) => (
                                            this.renderDay(mom, colKey)
                                        ))
                                    }
                                </div>
                                <div className={preClass('full-calendar-row-content')}>
                                    <RowEventLayout
                                        onContextMenu={onContextMenu}
                                        eventsMatrix={renderEvents[key]}
                                        colAmount={7}
                                        editable={editable}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default FullMonth;
