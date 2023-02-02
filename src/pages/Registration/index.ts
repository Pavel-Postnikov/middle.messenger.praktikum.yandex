import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './Registration.pug';
import validate from '../../utils/forms';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';
import ValidationSettings from '../../utils/Validation';
import * as styles from './Registration.scss'

interface RegistrationPageProps {
    title: string;
    errorForm?: string;
}

export default class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props: RegistrationPageProps) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Link({
                label: 'Зарегистрироваться',
                to: '/Authorization',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);
                        if (isValid) {
                            // todo Перейти на строчные буквы в url
                            AuthController.signup(form as SignupData);
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' })
                        }
                    },
                },
            }),
            new Link({
                label: 'Войти',
                to: '/Authorization',
                events: {
                    click: () => { },
                },
            }),
        ];

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Ваше имя',
                nameInput: 'first_name',
                type: 'text',
                placeholderText: 'Имя',
                validation: ValidationSettings('first_name'),
            }),
            new InputAreaBlock({
                nameInputText: 'Ваша фамилия',
                nameInput: 'second_name',
                type: 'text',
                placeholderText: 'Фамилия',
                validation: ValidationSettings('second_name'),
            }),
            new InputAreaBlock({
                nameInputText: 'Ваш номер телефона',
                nameInput: 'phone',
                type: 'tel',
                placeholderText: 'Телефон',
                validation: ValidationSettings('phone'),
            }),
            new InputAreaBlock({
                nameInputText: 'Адрес вашей почты',
                nameInput: 'email',
                type: 'text',
                placeholderText: 'Почта',
                validation: ValidationSettings('email'),
            }),
            new InputAreaBlock({
                nameInputText: 'Введите логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: 'Логин',
                validation: ValidationSettings('login'),
            }),
            new InputAreaBlock({
                nameInputText: 'Введите пароль',
                nameInput: 'password',
                type: 'password',
                placeholderText: 'Пароль',
                validation: ValidationSettings('password'),
            }),
            new InputAreaBlock({
                nameInputText: 'Повторите пароль ещё раз',
                nameInput: 'repeatPassword',
                type: 'password',
                placeholderText: 'Повторите пароль',
                validation: ValidationSettings('password'),
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles, errorForm: this.props.errorForm });
    }
}
