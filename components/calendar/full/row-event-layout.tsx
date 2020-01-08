import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';
import { preClass } from '../../utils';
import { CEvent } from '../tool';

export interface RowEventLayoutProps {
    editable: boolean;
    onContextMenu: (mom: moment.Moment, event: CEvent, e: React.MouseEvent) => void;
    eventsMatrix: CEvent[][];
    colAmount: number;
}

const RowEventLayout: React.SFC<RowEventLayoutProps> = (props: RowEventLayoutProps) => {
    const { editable, eventsMatrix, colAmount, onContextMenu } = props;
    const rowNodes = [];

    eventsMatrix.forEach((events, key) => {
        const eventNodes = [];
        let spanAmount = 0;

        events.forEach((event, i) => {
            const { index, span, begin, end, content, type, category } = event;
            const eventClass = classNames({
                [preClass('full-calendar-row-event')]: true,
                [preClass(`full-calendar-event-${type}`)]: true,
                [preClass('full-calendar-row-event-begin')]: begin,
                [preClass('full-calendar-row-event-end')]: end
            });

            if (i === 0 && index !== 0) {
                eventNodes.push(<td colSpan={index} key={`before-${index}`}/>);
                spanAmount += index;
            }

            if (i > 0) {
                const { index: preIndex, span: preSpan } = events[i - 1];
                if (index > preIndex + preSpan) {
                    const middleSpan = index - preIndex - preSpan;
                    eventNodes.push(<td colSpan={middleSpan} key={`middle-${index}`}/>);
                    spanAmount += middleSpan;
                }
            }

            eventNodes.push(
                <td colSpan={span} key={index}>
                    <div
                        onContextMenu={editable ? onContextMenu.bind(this, undefined, event) : null}
                        className={eventClass}>
                        { category && `${category} · ` }
                        { content }
                    </div>
                </td>
            );
            spanAmount += span;

            if (i === events.length - 1 && spanAmount !== colAmount) {
                eventNodes.push(<td colSpan={colAmount - spanAmount} key={`after-${index}`}/>);
            }
        });

        rowNodes.push(
            <tr key={key}>
                { eventNodes }
            </tr>
        );
    });

    return (
        <table className={preClass('full-calendar-row-events')}>
            <tbody>
                { rowNodes }
            </tbody>
        </table>
    );
};

export default RowEventLayout;
