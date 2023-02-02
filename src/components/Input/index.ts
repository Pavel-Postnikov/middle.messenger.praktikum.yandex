import Block from '../../utils/Block';
import template from './inputArea.pug';
import * as styles from './inputArea.scss'

interface InputProps {
    nameInputText: string;
    nameInput: string;
    type: string;
    placeholderText: string;
    id: string;
    validation: string;
    validationCheck: boolean;
    events: {
        change: () => void,
    };
    onError?: (error: string) => void;
    setValueInput?: (value: string) => void;
    setValidationCheck?: (value: boolean) => void;
}

export default class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super('input', props);
        this.element!.classList.add('inputAreaWindow');
        this.element!.setAttribute('name', props.nameInput);
        this.element!.setAttribute('type', props.type);
        this.element!.setAttribute('placeholder', props.placeholderText);
        this.element!.setAttribute('id', props.nameInput);
        this.setProps({
            events: {
                change: () => {
                    this.props.setValueInput((this.element as HTMLInputElement).value);
                },
                focus: () => {
                    if (this.element!.classList.contains('invalid')) {
                        this.element!.classList.remove('invalid');
                    }
                },
                blur: () => {
                    const regex = new RegExp(props.validation);

                    if (!regex.test((this.element as HTMLInputElement).value)) {
                        (this.element as HTMLInputElement).classList.add('invalid');

                        if (this.props.onError) {
                            this.props.onError('В поле выше есть ошибка');
                        }
                        this.props.validationCheck = false;
                        if (this.props.setValidationCheck) {
                            this.props.setValidationCheck(this.props.validationCheck);
                        }
                    }
                    if (regex.test((this.element as HTMLInputElement).value)) {
                        if (this.element!.classList.contains('invalid')) {
                            this.element!.classList.remove('invalid');
                        }
                        if (this.props.onError) {
                            this.props.onError('');
                        }

                        this.props.validationCheck = true;
                        if (this.props.setValidationCheck) {
                            this.props.setValidationCheck(this.props.validationCheck);
                        }
                    }
                },
            }
        })
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
