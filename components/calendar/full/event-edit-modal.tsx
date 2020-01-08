import * as React from 'react';
import { isEqual, isSameMoment, isExist } from '../../utils';
import { I18nReceiver, I18nCalendarInterface, I18nCommonInterface } from '../../i18n';
import { Event } from './index';
import Form, { CreateFormProps } from '../../form';
import Select, { SelectOptionProps } from '../../select';
import Input from '../../input';
import Button from '../../button';
import Modal from '../../modal';
import DatePicker from '../../date-picker';
import RadioGroup from '../../radio-group';
import * as moment from 'moment';
import { CEvent } from '../tool';
import { Mode, YEAR_MODE, MONTH_MODE, WEEK_MODE, DAY_MODE } from '../calendar-mode';

export interface EventEditModalProps extends CreateFormProps {
    visible: boolean;
    createMom: moment.Moment;
    editEvent: CEvent;
    onAppend: (event: Event) => void;
    onEdit: (event: Event) => void;
    hiddenEditModal: () => void;
    categories: SelectOptionProps[];
    mode: Mode;
}

export interface EventEditModalState {
    editMode: 'edit' | 'create';
    start: moment.Moment;
    finish: moment.Moment;
}

const eventTypeOptions = [];

[
    'primary',
    'info',
    'danger',
    'success',
    'warning'
].forEach((type) => {
    eventTypeOptions.push({ label: type, value: type });
});

const timeFormatter = (mom: moment.Moment): string => {
    return mom.format('YYYY-MM-DD HH:mm:ss');
};

class EventEditModal extends React.PureComponent<EventEditModalProps, EventEditModalState> {

    public constructor(props: EventEditModalProps) {
        super(props);

        this.state = {
            editMode: undefined,
            start: undefined,
            finish: undefined
        };

        [
            'onSubmit',
            'onStartChangeHandler',
            'onFinishChangeHandler'
        ].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private onSubmit() {
        const { form, onAppend, onEdit, editEvent, hiddenEditModal } = this.props;
        const { editMode } = this.state;

        form.verify((err, values: Event) => {
            if (err) {
                return;
            }

            if (editMode === 'create') {
                onAppend(values);
            }
            else {
                if (!isEqual(editEvent, values)) {
                    onEdit(values);
                }
            }

            hiddenEditModal();
        });
    }

    private onStartChangeHandler(start: moment.Moment) {
        this.setState({ start });
    }

    private onFinishChangeHandler(finish: moment.Moment) {
        this.setState({ finish });
    }

    public componentDidUpdate(preProps: EventEditModalProps) {
        if (
            !isSameMoment(preProps.createMom, this.props.createMom, 'hour')
            || !isEqual(preProps.editEvent, this.props.editEvent)
        ) {
            const editMode = moment.isMoment(this.props.createMom) ? 'create' : 'edit';
            const { createMom, editEvent } = this.props;
            let start: moment.Moment;
            let finish: moment.Moment;

            if (editMode === 'create') {
                switch (this.props.mode) {
                    case YEAR_MODE:
                        start = createMom.clone().startOf('month');
                        finish = createMom.clone().endOf('month');
                        break;

                    case MONTH_MODE:
                        start = createMom.clone().startOf('date');
                        finish = createMom.clone().endOf('date');
                        break;

                    case WEEK_MODE:
                    case DAY_MODE:
                        start = createMom.clone().startOf('hour');
                        finish = createMom.clone().endOf('hour');
                        break;
                }
            }
            else {
                start = editEvent.start.clone();
                finish = editEvent.finish.clone();
            }

            this.setState({
                editMode,
                start,
                finish
            });
        }

        if (preProps.visible !== this.props.visible && this.props.visible) {
            this.props.form.resetValidator();
        }
    }

    private renderForm(i18n: I18nCalendarInterface) {
        const { categories, form, editEvent } = this.props;
        const { Validator } = form;
        const { start, finish } = this.state;

        return (
            <Form>
                <Form.Item label={i18n.editModal.startTime}>
                    <Validator name='start' rules={[{ required: true, message: i18n.editModal.startTimeNotice }]}>
                        <DatePicker
                            value={start}
                            timeable={true}
                            placeholder={i18n.editModal.startTimePlaceholder }
                            onChange={this.onStartChangeHandler}
                            disabledDate={{ after: finish }}
                            formatter={timeFormatter}/>
                    </Validator>
                </Form.Item>
                <Form.Item label={i18n.editModal.finishTime}>
                    <Validator name='finish' rules={[{ required: true, message: i18n.editModal.finishTimeNotice }]}>
                        <DatePicker
                            value={finish}
                            timeable={true}
                            onChange={this.onFinishChangeHandler}
                            disabledDate={{ before: start }}
                            placeholder={i18n.editModal.finishTimePlaceholder}
                            formatter={timeFormatter}/>
                    </Validator>
                </Form.Item>
                <Form.Item label={i18n.editModal.type}>
                    <Validator name='type' rules={[{ required: true, message: i18n.editModal.typeNotice }]}>
                        <RadioGroup
                            value={isExist(editEvent) ? editEvent.type : undefined}
                            options={eventTypeOptions}/>
                    </Validator>
                </Form.Item>
                {
                    Array.isArray(categories) &&
                    <Form.Item label={i18n.editModal.category}>
                        <Validator name='category' rules={[{ required: true, message: i18n.editModal.categoryNotice }]}>
                            <Select
                                placeholder={i18n.editModal.categoryPlaceholder}
                                value={isExist(editEvent) ? editEvent.category : undefined}>
                                {
                                    categories.map((category, key) => (
                                        <Select.Option {...category} key={key}/>
                                    ))
                                }
                            </Select>
                        </Validator>
                    </Form.Item>
                }
                <Form.Item label={i18n.editModal.content}>
                    <Validator name='content' rules={[{ required: true, message: i18n.editModal.contentNotice }]}>
                        <Input.Textarea
                            placeholder={i18n.editModal.contentPlaceholder}
                            value={isExist(editEvent) ? editEvent.content : undefined}/>
                    </Validator>
                </Form.Item>
            </Form>
        );
    }

    public render() {
        const { visible, hiddenEditModal, editEvent } = this.props;

        return (
            <Modal visible={visible} closeOnPressEsc={true} onClose={hiddenEditModal}>
                <Modal.Header
                    title={
                        isExist(editEvent)
                            ? <I18nReceiver module='Calendar'>
                                { (i18n: I18nCalendarInterface) => i18n.editModal.createTitle }
                            </I18nReceiver>
                            : <I18nReceiver module='Calendar'>
                                { (i18n: I18nCalendarInterface) => i18n.editModal.editTitle }
                            </I18nReceiver>
                    }
                    onClose={hiddenEditModal}/>
                <Modal.Body>
                    <I18nReceiver module='Calendar'>
                        { (i18n: I18nCalendarInterface) => this.renderForm(i18n) }
                    </I18nReceiver>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={hiddenEditModal}>
                        <I18nReceiver module='Common'>
                            { (i18n: I18nCommonInterface) => i18n.cancel }
                        </I18nReceiver>
                    </Button>
                    <Button type='primary' onClick={this.onSubmit}>
                        <I18nReceiver module='Common'>
                            { (i18n: I18nCommonInterface) => i18n.confirm }
                        </I18nReceiver>
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Form.createForm()(EventEditModal);
