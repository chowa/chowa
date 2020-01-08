import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';
import { I18nReceiver, I18nCalendarInterface } from '../../i18n';
import { preClass, isSameMoment, isEqual } from '../../utils';
import { CEvent, compileColumnEvents } from '../tool';
import { Event } from './index';
import ColumnEventLayout from './column-event-layout';

export interface FullWeekProps {
    value: moment.Moment;
    events: Event[];
    editable: boolean;
    appendable: boolean;
    onContextMenu: (mom: moment.Moment, event: CEvent, e: React.MouseEvent) => void;
}

export interface FullWeekState {
    renderMoms: moment.Moment[];
    renderEvents: CEvent[][][];
}

class FullWeek extends React.PureComponent<FullWeekProps, FullWeekState> {

    public constructor(props: FullWeekProps) {
        super(props);

        this.state = {
            ...this.compileRenderParams(props.value, props.events)
        };
    }

    public componentDidUpdate(preProps: FullWeekProps) {
        if (
            !isSameMoment(preProps.value, this.props.value)
            || !isEqual(preProps.events, this.props.events)
        ) {
            this.setState({
                ...this.compileRenderParams(this.props.value, this.props.events)
            });
        }
    }

    public compileRenderParams(value: moment.Moment, events: Event[]) {
        const renderMoms = [];
        const renderEvents = [];
        for (let i = 1; i <= 7; i++) {
            const mom = value.clone().startOf('isoWeek').day(i);
            renderMoms.push(mom);
            renderEvents.push(compileColumnEvents(events, mom));
        }

        return {
            renderMoms,
            renderEvents
        };
    }

    public render() {
        const { renderMoms, renderEvents } = this.state;
        const { editable, appendable, onContextMenu } = this.props;

        const wrapperClass = classNames({
            [preClass('full-calendar-mode-wrapper')]: true,
            [preClass('full-calendar-mode-week')]: true
        });

        return (
            <div className={wrapperClass}>
                <div className={preClass('full-calendar-header')}>
                    <div className={preClass('full-calendar-time-widget')}/>
                    <dl className={preClass('full-calendar-week-title-wrapper')}>
                        {
                            renderMoms.map((mom, key) => (
                                <dd key={key} className={preClass('full-calendar-header-title')}>
                                    <I18nReceiver module='Calendar'>
                                        { (i18n: I18nCalendarInterface) => i18n.weeks[key] }
                                    </I18nReceiver>
                                    { mom.format('M/D') }
                                </dd>
                            ))
                        }
                    </dl>
                </div>
                <ColumnEventLayout
                    editable={editable}
                    appendable={appendable}
                    onContextMenu={onContextMenu}
                    moms={renderMoms}
                    events={renderEvents}/>
            </div>
        );
    }
}

export default FullWeek;
