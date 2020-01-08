import * as moment from 'moment';
import { Event, EventType } from './full';
import { isExist, isSameMoment } from '../utils';

export interface RangeDate {
    begin: moment.Moment;
    end: moment.Moment;
}

export interface DisabledDate {
    begin?: moment.Moment;
    end?: moment.Moment;
    before?: moment.Moment;
    after?: moment.Moment;
}

export interface CEvent {
    eventIndex: number;
    index: number;
    span: number;
    type: EventType;
    begin: boolean;
    end: boolean;
    start: moment.Moment;
    finish: moment.Moment;
    content: string;
    category: string;
}

export function isDisabledDate(
    date: moment.Moment,
    disabledDate: DisabledDate,
    granularity: moment.unitOfTime.StartOf = 'day'
): boolean {
    if (!disabledDate) {
        return false;
    }

    const { begin, end, before, after } = disabledDate;
    let flag = false;

    if (moment.isMoment(begin) && moment.isMoment(end)) {
        flag = date.isBetween(begin, end, granularity)
            || date.isSame(begin, granularity)
            || date.isSame(end, granularity);
    }

    if (!flag && moment.isMoment(before)) {
        flag = date.isBefore(before, granularity);
    }

    if (!flag && moment.isMoment(after)) {
        flag = date.isAfter(after, granularity);
    }

    return flag;
}

export function isRangeDate(
    date: moment.Moment,
    rangeDate: RangeDate,
    granularity: moment.unitOfTime.StartOf = 'day'
): boolean {
    if (!rangeDate) {
        return false;
    }

    const { begin, end } = rangeDate;

    if (moment.isMoment(begin) && moment.isMoment(end)) {
        return date.isBetween(begin, end, granularity);
    }

    return false;
}

export function hasActiveMoment(
    mom: moment.Moment,
    values: moment.Moment[],
    granularity: moment.unitOfTime.StartOf = 'day'
): boolean {
    if (!Array.isArray(values)) {
        return false;
    }

    return values.some((value) => isSameMoment(value, mom, granularity));
}

export function compileRowEvents(
    events: Event[],
    rowMoms: moment.Moment[],
    granularity: 'day' | 'month'
): CEvent[][] {
    const ret: CEvent[][] = [];
    const amount = rowMoms.length;
    const firstMom = rowMoms[0];
    const lastMom = rowMoms[amount - 1];
    const rowEvents: CEvent[] = [];

    if (!Array.isArray(events)) {
        return ret;
    }

    events.forEach((event, key) => {
        const { start: orginStart, finish: originFinish, type, content, category } = event;

        const start = orginStart.clone();
        const finish = originFinish.clone();

        if (granularity === 'day') {
            start.hour(0).minute(0).second(0);
            finish.hour(0).minute(0).second(0);
        }
        else {
            start.date(5).hour(0).minute(0).second(0);
            finish.date(5).hour(0).minute(0).second(0);
        }

        if (
            start.isBetween(firstMom, lastMom, granularity)
            || finish.isBetween(firstMom, lastMom, granularity)
            || start.isSame(firstMom, granularity)
            || finish.isSame(lastMom, granularity)
            || start.isSame(lastMom, granularity)
            || finish.isSame(firstMom, granularity)
        ) {
            const index = start.isBefore(firstMom, granularity)
                ? 0
                : start.diff(firstMom, granularity);
            const span = finish.isAfter(lastMom, granularity)
                ? amount - index
                : start.isBefore(firstMom, granularity)
                    ? finish.diff(firstMom, granularity) + 1
                    : finish.diff(start, granularity) + 1;

            rowEvents.push({
                eventIndex: key,
                index,
                span,
                type: isExist(type) ? type : 'info',
                begin: start.isSame(rowMoms[index], granularity),
                end: finish.isSame(rowMoms[index + span - 1], granularity),
                content,
                category,
                start: orginStart,
                finish: originFinish
            });
        }
        else if (start.isBefore(firstMom, granularity) && finish.isAfter(lastMom, granularity)) {
            rowEvents.push({
                eventIndex: key,
                index: 0,
                span: amount,
                type: isExist(type) ? type : 'info',
                begin: false,
                end: false,
                content,
                category,
                start: orginStart,
                finish: originFinish
            });
        }
    });

    rowEvents.forEach((rowEvent) => {
        const appended = ret.some((row) => {
            const lastIndex = row.reduce((pre, current) => {
                const endIndex = current.index + current.span - 1;
                return pre > endIndex ? pre : endIndex;
            }, 0);

            if (lastIndex < rowEvent.index) {
                row.push(rowEvent);
                return true;
            }

            return false;
        });

        if (!appended) {
            ret.push([rowEvent]);
        }
    });

    return ret;
}

export function compileColumnEvents(events: Event[], mom: moment.Moment) {
    const ret: CEvent[][] = [];
    const rangeGranularity = 'second';
    const granularity = 'minute';
    const amount = 24;
    const colEvents: CEvent[] = [];

    if (!Array.isArray(events)) {
        return ret;
    }

    const firstMom = mom.clone().hour(0).minute(0).second(0);
    const lastMom = mom.clone().hour(24).minute(0).second(0);

    events.forEach((event, key) => {
        const { start, finish, type, content, category } = event;

        if (
            start.isBetween(firstMom, lastMom, rangeGranularity)
            || finish.isBetween(firstMom, lastMom, rangeGranularity)
            || start.isSame(firstMom, rangeGranularity)
            || finish.isSame(lastMom, rangeGranularity)
        ) {
            const index = start.isBefore(firstMom, granularity)
                ? 0
                : start.diff(firstMom, granularity) / 60;
            const span = finish.isAfter(lastMom, granularity)
                ? amount - index
                : (
                    start.isBefore(firstMom, granularity)
                        ? finish.diff(firstMom, granularity)
                        : finish.diff(start, granularity)
                ) / 60;
            const diffStart = mom.clone().hour(0).minute(index * 60).second(0);
            const diffFinish = mom.clone().hour(0).minute(Math.round(index + span) * 60).second(0);

            colEvents.push({
                eventIndex: key,
                index,
                span,
                type: isExist(type) ? type : 'info',
                begin: start.isSame(diffStart, granularity) || diffStart.isBefore(start, granularity),
                end: finish.isSame(diffFinish, granularity) || diffFinish.isAfter(finish, granularity),
                content,
                category,
                start,
                finish
            });
        }
        else if (start.isBefore(firstMom, granularity) && finish.isAfter(lastMom, granularity)) {
            colEvents.push({
                eventIndex: key,
                index: 0,
                span: amount,
                type: isExist(type) ? type : 'info',
                begin: false,
                end: false,
                content,
                category,
                start,
                finish
            });
        }
    });

    colEvents.forEach((colEvent) => {
        const appended = ret.some((col) => {
            const lastIndex = col.reduce((pre, current) => {
                const endIndex = current.index + current.span - 1;
                return pre > endIndex ? pre : endIndex;
            }, 0);

            if (lastIndex < colEvent.index) {
                col.push(colEvent);
                return true;
            }

            return false;
        });

        if (!appended) {
            ret.push([colEvent]);
        }
    });

    return ret;
}
