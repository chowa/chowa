import * as React from 'react';
import { preClass, padZero } from '../../utils';
import { CEvent } from '../tool';
import * as moment from 'moment';
import * as classNames from 'classnames';

export interface ColumnEventLayoutProps {
    moms: moment.Moment[];
    events: CEvent[][][];
    editable: boolean;
    appendable: boolean;
    onContextMenu: (mom: moment.Moment, event: CEvent, e: React.MouseEvent) => void;
}

class ColumnEventLayout extends React.PureComponent<ColumnEventLayoutProps, any> {

    private renderColumnEvents(events: CEvent[], key: number) {
        const nodes = [];
        const { editable, onContextMenu } = this.props;

        events.forEach((event, i) => {
            const { index, span, begin, end, content, type } = event;

            const eventClass = classNames({
                [preClass('full-calendar-col-event')]: true,
                [preClass(`full-calendar-col-span-${Math.round(span * 2)}`)]: true,
                [preClass(`full-calendar-col-index-${Math.round(index * 2)}`)]: true,
                [preClass(`full-calendar-event-${type}`)]: true,
                [preClass('full-calendar-col-event-begin')]: begin,
                [preClass('full-calendar-col-event-end')]: end
            });

            nodes.push(
                <div
                    onContextMenu={editable ? onContextMenu.bind(this, undefined, event) : null}
                    className={eventClass} key={i}>
                    { content }
                </div>
            );
        });

        return (
            <div className={preClass('full-calendar-column-events-wrapper')} key={key}>
                { nodes }
            </div>
        );
    }

    public renderColumn(value: moment.Moment, key: number) {
        const { events, appendable, onContextMenu } = this.props;
        const yAxisNodes = [];

        if (appendable) {
            for (let i = 0; i < 24; i++) {
                yAxisNodes.push(
                    <div
                        className={preClass('full-calendar-y-axis')}
                        onContextMenu={onContextMenu.bind(this, value.clone().hour(i), undefined)}
                        key={i}/>
                );
            }
        }

        return (
            <div className={preClass('full-calendar-column-wrapper')} key={key}>
                <div className={preClass('full-calendar-column-events')} data-time={value.format('Y M D H:m:s')}>
                    {
                        appendable &&
                        <div className={preClass('full-calendar-y-axis-wrapper')}>
                            { yAxisNodes }
                        </div>
                    }
                    {
                        events[key].map((columnEvents, colKey) => (
                            this.renderColumnEvents(columnEvents, colKey)
                        ))
                    }
                </div>
            </div>
        );
    }

    public renderAxis() {
        const nodes = [];

        for (let i = 0; i < 24; i++) {
            nodes.push(
                <div key={i} className={preClass('full-calendar-x-axis')}>
                    <span className={preClass('full-calendar-time')}>{ padZero(i) }:00</span>
                </div>
            );
        }

        return (
            <div className={preClass('full-calendar-axis-wrapper')}>
                { nodes }
            </div>
        );
    }

    public render() {
        const { moms } = this.props;

        return (
            <div className={preClass('full-calendar-body')}>
                <div className={preClass('full-calendar-content-wrapper')}>
                    { this.renderAxis() }
                    <div className={preClass('full-calendar-time-content')}>
                        {
                            moms.map((mom, key) => (
                                this.renderColumn(mom, key)
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ColumnEventLayout;
