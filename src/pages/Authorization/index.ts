import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './Authorization.pug';
import * as styles from './Authorization.scss';
import validate from '../../utils/forms';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';
import ValidationSettings from '../../utils/Validation';

interface AuthorizationPageProps {
    title: string;
}

export default class AuthorizationPage extends Block<AuthorizationPageProps> {
    constructor(props: AuthorizationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Link({
                label: 'Войти',
                to: '',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);
                        if (isValid) {
                            AuthController.signin(form as SignupData);
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' })
                        }
                    },
                },
            }),
            new Link({
                label: 'Зарегистрироваться',
                to: '/sign-up',
                events: {
                    click: () => { },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Введите логин',
                validation: ValidationSettings('login'),
            }),
            new InputAreaBlock({
                nameInputText: 'Пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Введите пароль',
                validation: ValidationSettings('password'),
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}