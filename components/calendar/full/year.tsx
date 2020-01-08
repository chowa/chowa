import * as React from 'react';
import * as moment from 'moment';
import classNames from 'classnames';
import { I18nReceiver, I18nCalendarInterface } from '../../i18n';
import { preClass, isEqual, isSameMoment } from '../../utils';
import { Event } from './index';
import { CEvent, compileRowEvents } from '../tool';
import RowEventLayout from './row-event-layout';

export interface FullYearProps {
    value: moment.Moment;
    events: Event[];
    editable: boolean;
    appendable: boolean;
    onContextMenu: (mom: moment.Moment, event: CEvent, e: React.MouseEvent) => void;
}

export interface FullYearState {
    renderMoms: moment.Moment[][];
    renderEvents: CEvent[][][];
}

class FullYear extends React.PureComponent<FullYearProps, FullYearState> {

    public constructor(props: FullYearProps) {
        super(props);

        this.state = {
            ...this.compileRenderParams(props.value, props.events)
        };
    }

    public componentDidUpdate(preProps: FullYearProps) {
        if (
            !isSameMoment(preProps.value, this.props.value)
            || !isEqual(preProps.events, this.props.events)
        ) {
            this.setState({
                ...this.compileRenderParams(this.props.value, this.props.events)
            });
        }
    }

    private compileRenderParams(value: moment.Moment, events: Event[]) {
        const renderMoms = [];
        const renderLunars = [];
        const renderEvents = [];

        for (let i = 0; i < 4; i++) {
            const rowMoms = [];
            const startIndex = i * 3;
            for (let j = 0; j < 3; j++) {
                const mom = value.clone().date(1).month(startIndex + j);
                rowMoms.push(mom);
            }
            renderMoms.push(rowMoms);
            renderEvents.push(compileRowEvents(events, rowMoms, 'month'));
        }

        return {
            renderMoms,
            renderLunars,
            renderEvents,
            activeMonth: undefined,
            activeEvent: undefined
        };
    }

    private renderMonth(mom: moment.Moment, key: number) {
        const { appendable, onContextMenu } = this.props;
        const currentValue = moment();

        const monthClass = classNames({
            [preClass('full-calendar-num')]: true,
            [preClass('full-calendar-active')]: mom.isSame(currentValue, 'month')
        });

        return (
            <div
                onContextMenu={appendable ? onContextMenu.bind(this, mom, undefined) : null}
                className={preClass('full-calendar-mode-detail-wrapper')}
                key={key}>
                <div className={preClass('full-calendar-mode-detail')}>
                    <span className={monthClass}>
                        <I18nReceiver module='Calendar'>
                            { (i18n: I18nCalendarInterface) => i18n.months[mom.month()] }
                        </I18nReceiver>
                    </span>
                </div>
            </div>
        );
    }

    public render() {
        const { renderMoms, renderEvents } = this.state;
        const { editable, onContextMenu } = this.props;

        const wrapperClass = classNames({
            [preClass('full-calendar-mode-wrapper')]: true,
            [preClass('full-calendar-mode-year')]: true
        });

        return (
            <div className={wrapperClass}>
                <div className={preClass('full-calendar-header')}/>
                <div className={preClass('full-calendar-body')}>
                    {
                        renderMoms.map((row, key) => (
                            <div className={preClass('full-calendar-row-wrapper')} key={key}>
                                <div className={preClass('full-calendar-row-bg')}>
                                    {
                                        row.map((mom, colKey) => (
                                            this.renderMonth(mom, colKey)
                                        ))
                                    }
                                </div>
                                <div className={preClass('full-calendar-row-content')}>
                                    <RowEventLayout
                                        onContextMenu={onContextMenu}
                                        eventsMatrix={renderEvents[key]}
                                        colAmount={3}
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

export default FullYear;
