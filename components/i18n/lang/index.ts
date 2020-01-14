// import * as defaultLang from './zh-CN';
import * as defaultLang from './en-US';

export interface I18nCommonInterface {
    confirm: string;
    cancel: string;
    clear: string;
}

export interface I18nCalendarInterface {
    year: string;
    month: string;
    week: string;
    day: string;
    yearFormat: string;
    monthFormat: string;
    weeksFormat: string;
    dayFormat: string;
    weeks: string[];
    months: string[];
    date: string;
    time: string;
    today: string;
    now: string;
    contextmenu: {
        createEvent: string;
        editEvent: string;
        removeEvent: string;
    };
    editModal: {
        createTitle: string;
        editTitle: string;
        startTime: string;
        startTimePlaceholder: string;
        startTimeNotice: string;
        finishTime: string;
        finishTimePlaceholder: string;
        finishTimeNotice: string;
        type: string;
        typeNotice: string;
        category: string;
        categoryPlaceholder: string;
        categoryNotice: string;
        content: string;
        contentPlaceholder: string;
        contentNotice: string;
    };
}

export interface I18nCascaderInterface {
    placeholder: string;
    noDataDescription: string;
}

export interface I18nDatePickerInterface {
    datePlaceholder: string;
    dateFormat: string;
    monthPlaceholder: string;
    monthFormat: string;
    yearPlaceholder: string;
    yearFormat: string;
    weeksPlaceholder: string;
    weeksFormat: string;
    rangePlaceholder: string;
    rangeFormat: string;
}

export interface I18nModalInterface {
    alertTitle: string;
    confirmTitle: string;
    promptTitle: string;
}

export interface I18nNoDataInterface {
    description: string;
}

export interface I18nPaginationInterface {
    pageSizeUnit: string;
}

export interface I18nRateInterface {
    valueUnit: string;
}

export interface I18nSelectInterface {
    placeholder: string;
    noDataDescription: string;
}

export interface I18nTimePickerInterface {
    placehoder: string;
}

export interface I18nTransferInterface {
    searchPlaceholder: string;
    noDataDescription: string;
    titles: [string, string];
}

export interface I18nTableInterface{
    expandedOpenNode: string;
    expandedCloseNode: string;
}

export interface I18nUploadInterface{
    select: string;
    drag: string;
}

export default defaultLang;
