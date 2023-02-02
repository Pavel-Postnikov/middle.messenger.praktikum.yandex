import Block from '../../utils/Block';
import Link from '../../components/Link';
import InputAreaBlock from '../../components/InputAreaBlock';
import template from './ChangingUserInformation.pug';
import img from '../../../static/img/avatar.jpg';
import validate from '../../utils/forms';
import UserController from '../../controllers/UserController';
import { UserUpData } from '../../api/UserAPI';
import ValidationSettings from '../../utils/Validation';
import { withStore } from '../../utils/store';
import * as styles from './ChangingUserInformation.scss'


interface ChangingUserInformationPageProps {
    title: string;
}

class BaseChangingUserInformationPage extends Block<ChangingUserInformationPageProps> {
    constructor(props: ChangingUserInformationPageProps) {
        super('div', props);
    }

    componentDidMount(): void {
    }
    

    init() {
        
        this.children.button = [
            new Link({
                label: 'Сохранить',
                href: '/settings',
                events: {
                    click: () => {
                        const { isValid, form } = validate(this.children.inputAreaBlock as InputAreaBlock[]);
                        if (isValid) {
                            UserController.profile(form as UserUpData);
                        } else {
                            this.setProps({ errorForm: 'Какое-то поле введено не верно!' })
                        }
                    },
                },
            }),
        ];
   
        
    }

    render() {

        this.children.inputAreaBlock = [
            new InputAreaBlock({
                nameInputText: 'Имя',
                nameInput: 'first_name',
                type: 'text',
                placeholderText: this.props.first_name,
                validation: ValidationSettings('first_name'),
            }),
            new InputAreaBlock({
                nameInputText: 'Фамилия',
                nameInput: 'second_name',
                type: 'text',
                placeholderText: this.props.second_name,
                validation: ValidationSettings('second_name'),
            }),
            new InputAreaBlock({
                nameInputText: 'Телефон',
                nameInput: 'phone',
                type: 'text',
                placeholderText: this.props.phone,
                validation: ValidationSettings('phone'),
            }),
            new InputAreaBlock({
                nameInputText: 'Почта',
                nameInput: 'email',
                type: 'text',
                placeholderText: this.props.email,
                validation: ValidationSettings('email'),
            }),
            new InputAreaBlock({
                nameInputText: 'Логин',
                nameInput: 'login',
                type: 'text',
                placeholderText: this.props.login,
                validation: ValidationSettings('login'),
            }),
            new InputAreaBlock({
                nameInputText: 'Имя в чате',
                nameInput: 'display_name',
                type: 'text',
                placeholderText: this.props.display_name,
                validation: ValidationSettings('display_name'),
            }),
        ];
        return this.compile(template, { ...this.props, img, styles });
    }
}

const withUser = withStore((state) => ({ ...state.user }))

export default withUser(BaseChangingUserInformationPage);