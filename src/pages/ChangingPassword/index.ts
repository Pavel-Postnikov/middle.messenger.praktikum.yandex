import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './ChangingPassword.pug';
import img from '../../../static/img/avatar.jpg';
import validate from '../../utils/forms';
import UserController from '../../controllers/UserController';
import { PasswordUp } from '../../api/UserAPI';
import ValidationSettings from '../../utils/Validation';
import * as styles from './ChangingPassword.scss'

interface ChangingPasswordPageProps {
    title: string;
}

export default class ChangingPasswordPage extends Block<ChangingPasswordPageProps> {
    constructor(props: ChangingPasswordPageProps) {
        super('div', props);
    }

    init() {

        this.children.button = [
            new Link({
                label: 'Сохранить',
                to: '',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);
                        if (isValid) {
                            UserController.password(form as PasswordUp);
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' });
                        }
                    },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Старый пароль',
                nameInput: 'oldPassword',
                type: 'password',
                placeholderText: 'Введите ваш старый пароль',
                validation: ValidationSettings('password'),
            }),
            new InputAreaBlock({
                nameInputText: 'Новый пароль',
                nameInput: 'newPassword',
                type: 'password',
                placeholderText: 'Введите новый пароль',
                validation: ValidationSettings('password'),
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, img, styles });
    }
}
