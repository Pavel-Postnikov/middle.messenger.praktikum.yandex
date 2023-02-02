import Block from '../../utils/Block';
import Link from '../../components/Link';
import DialogItem from '../../components/DialogItem';
import template from './Chat.pug';
import InputAreaBlock from '../../components/InputAreaBlock';
import img from '../../../static/img/avatar.jpg';
import test from '../../../static/img/test.jpg';
import { AddUserinChatData, CreateChat, DeleteChat, GetChatsData } from '../../api/ChatAPI';
import ChatController from '../../controllers/ChatController';
import store, { withStore } from '../../utils/store';
import DialogMessages from '../../components/DialogMesseges';
import AuthController from '../../controllers/AuthController';
import ValidationSettings from '../../utils/Validation';
import LinkSettings from '../../components/LinkSettings';
import ActiveDialogItem from '../../components/ActiveDialogItem';
import * as styles from './Chat.scss'


interface ChatPageProps {
    title: string;
}

class ChatPage extends Block<ChatPageProps> {
    private socket?: WebSocket;

    constructor(props: ChatPageProps) {
        super('div', props);
    }

    async componentDidMount(): Promise<void> {
        const datachats: GetChatsData = {
            offset: 0,
            limit: 7,
            title: ''
        }
        ChatController.getChats(datachats)
    }


    componentDidUpdate(_oldProps: any, _newProps: any): boolean {
        if (_newProps.activeChat.id !== _oldProps.activeChat.id && this.socket) {
            this.socket = undefined;
        }
        if (_newProps.activeChat.id && !this.socket) {
            (async () => {
                
                store.set('messages', []);
                const user = await AuthController.getUser();
                const token: any = await ChatController.getTokenChat(_newProps.activeChat.id);
                this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${_newProps.activeChat.id}/${token.token}`);

                this.socket.addEventListener('open', () => {
                    console.log('Соединение установлено');

                    if (this.socket) {

                        this.socket.send(JSON.stringify({
                            content: '0',
                            type: 'get old',
                        }));
                    }

                });

                this.socket.addEventListener('message', event => {
                    try {
                        console.log('Получено сообщение', JSON.parse(event.data));
                        const { messages } = store.getState();
                        const data = JSON.parse(event.data);
                        store.set('messages', [...(messages || []), ...(Array.isArray(data) ? data : [data])])
                    } catch (e: any) {
                        console.error(e.message);
                    }
                });
            })()

        }
        return true

    }

    render() {

        this.children.buttonBlockProfile = [
            new Link({
                label: 'Найти',
                to: '',
                events: {
                    click: () => {
                        const nameChat = (this.children.searchChat as InputAreaBlock).getValue();
                        const datachats: GetChatsData = {
                            offset: 0,
                            limit: 5,
                            title: nameChat
                        }
                        ChatController.getChats(datachats)
                    },
                },
            }),
        ];

        this.children.searchChat = new InputAreaBlock({
            nameInputText: '',
            nameInput: 'searchChat',
            type: 'text',
            placeholderText: 'Название чата',
            validation: ValidationSettings('message'),
        });

        this.children.buttonCreateChat = [
            new Link({
                label: 'Добавить чат',
                to: '',
                events: {
                    click: () => {
                        const sign = window.prompt('Введите название чата!');
                        if (sign) {
                            const data: CreateChat = {
                                title: sign
                            }
                            ChatController.createChat(data);
                        }
                    },
                },
            }),
        ];

        this.children.AddUserinChat = [
            new Link({
                label: 'Добавить пользователя в чат',
                to: '',
                events: {
                    click: () => {
                        const user = window.prompt('Введите ID пользователя!');
                        const chat = window.prompt('Введите ID чата!');
                        if (user && chat) {
                            const data: AddUserinChatData = {
                                users: [Number(user)],
                                chatId: Number(chat)
                            }
                            ChatController.addUserinChat(data);
                        }
                    },
                },
            }),
        ];


        this.children.profile = [
            new LinkSettings({
                label: 'Мой профиль',
                to: '/settings',
                events: {
                    click: () => { },
                },
            }),
        ];


        this.children.addChat = [
            new LinkSettings({
                label: 'Добавить чат',
                to: '',
                events: {
                    click: () => {
                        const sign = window.prompt('Введите название чата!');
                        if (sign) {
                            const data: CreateChat = {
                                title: sign
                            }
                            ChatController.createChat(data);
                        }
                    },
                },
            }),
        ];

        this.children.deleteChat = [
            new LinkSettings({
                label: 'Удалить чат',
                to: '',
                events: {
                    click: () => {
                        const sign = window.prompt('Введите id чата который хотите удалить!');
                        const data: DeleteChat = {
                            chatId: Number(sign)
                        }
                        ChatController.deleteChat(data);
                    },
                },
            }),
        ];

        this.children.buttonMessageSend = [
            new Link({
                label: 'Отправить',
                to: '',
                events: {
                    click: () => {
                        const message = (this.children.inputAreaBlocMessageChat as InputAreaBlock).getValue();

                        if (this.socket) {
                            this.socket.send(JSON.stringify({
                                content: message,
                                type: 'message',
                            }));
                        }
                    },
                },
            }),
        ];
        
        this.children.DialogMessages = [
            new DialogMessages({
                messages: this.props.messages
            }),
        ];

        this.children.inputAreaBlocMessageChat =
            new InputAreaBlock({
                nameInputText: '',
                nameInput: 'message',
                type: 'text',
                placeholderText: 'Введите сообщение',
                validation: ValidationSettings('message'),
            })

        if (this.props.chats) {

            this.children.dialogItem = this.props.chats.map((chat: any) => new DialogItem({
                NameDialog: this.props.activeChat.id === chat.id ? `${chat.title} Active` : chat.title,
                message: 'Последнее сообщение',
                time: chat.id,
                counterMessage: chat.unread_count,
                events: {
                    click: () => {
                        store.set('activeChat', chat)
                    },
                },
            }))

            if (this.props.activeChat.id) {
                this.children.activeDialogItem =
                new ActiveDialogItem({
                    NameDialog: this.props.activeChat.title,
                })
            }
        }
        return this.compile(template, { ...this.props, styles, img, test });
    }
}

const withChat = withStore(state => ({ chats: [...(state.chats || [])] }))
const withActiveChat = withStore(state => ({ activeChat: { ...state.activeChat }, }))
const withDialogMessages = withStore(state => ({ messages: [...(state.messages || [])] }))


export default withActiveChat(withDialogMessages(withChat(ChatPage)));