import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';
import { I18nReceiver, I18nCalendarInterface } from '../../i18n';
import { preClass, isSameMoment, isEqual } from '../../utils';
import { compileColumnEvents, CEvent } from './../tool';
import { Event } from './index';
import ColumnEventLayout from './column-event-layout';

export interface FullDayProps {
    value: moment.Moment;
    events: Event[];
    editable: boolean;
    appendable: boolean;
    onContextMenu: (mom: moment.Moment, event: CEvent, e: React.MouseEvent) => void;
}

export interface FullDayState {
    renderMoms: moment.Moment[];
    renderEvents: CEvent[][][];
}

class FullDay extends React.PureComponent<FullDayProps, FullDayState> {

    public constructor(props: FullDayProps) {
        super(props);

        this.state = {
            ...this.compileRenderParams(props.value, props.events)
        };
    }

    public componentDidUpdate(preProps: FullDayProps) {
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
        const mom = value.clone();
        const renderMoms = [mom];
        const renderEvents = [compileColumnEvents(events, mom)];
        return {
            renderMoms,
            renderEvents
        };
    }

    public render() {
        const { renderMoms, renderEvents } = this.state;
        const { editable, appendable, onContextMenu } = this.props;

        const weekIndex = renderMoms[0].day() === 0
            ? 6 : renderMoms[0].day() - 1;
        const wrapperClass = classNames({
            [preClass('full-calendar-mode-wrapper')]: true,
            [preClass('full-calendar-mode-day')]: true
        });

        return (
            <div className={wrapperClass}>
                <div className={preClass('full-calendar-header')}>
                    <div className={preClass('full-calendar-time-widget')}/>
                    <div className={preClass('full-calendar-day-header-title')}>
                        <I18nReceiver module='Calendar'>
                            { (i18n: I18nCalendarInterface) => i18n.weeks[weekIndex] }
                        </I18nReceiver>
                    </div>
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

export default FullDay;
