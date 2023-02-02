import API, { AddUserinChatData, ChatAPI, CreateChat, DeleteChat, GetChatsData } from "../api/ChatAPI";
import store from "../utils/store";

export class UserController {
    private readonly api: ChatAPI;

    constructor() {
        this.api = API;
    }

    async deleteChat(chatId: DeleteChat) {
        try {
            await this.api.delete(chatId);
            const data: GetChatsData = {
                offset: 0,
                limit: 5,
                title: ''
            }
            this.getChats(data);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async getTokenChat(idChat: number) {
        return this.api.getTokenChat(idChat);
    }

    async createChat(title: CreateChat) {
        try {
            await this.api.create(title);

            const data: GetChatsData = {
                offset: 0,
                limit: 7,
                title: ''
            }
            this.getChats(data);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async addUserinChat(params: AddUserinChatData) {
        try {
            await this.api.addUser(params);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async getChats(params: GetChatsData) {
        try {
            const chats = await this.api.read(params);
            store.set('chats', chats);
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new UserController();