import HTTPTransport from "../utils/HTTPTransport";

export interface SigninData {
    login: string;
    password: string;
}

export interface SignupData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export interface GetChatsData {
    offset: number;
    limit: number;
    title: string;
}

export interface AddUserinChatData {
    users: number[];
    chatId: number;
}

export interface CreateChat {
    title: string;
}
export interface DeleteChat {
    chatId: number;
}

export interface GetChatsReturn {
    id: number,
    title: string,
    avatar: string,
    created_by: number,
    unread_count: number,
    last_message: any
}

export interface GetTockenChatReutrn {
    token: string,
}

export interface AddChatReturn {
    id: number,
}

export interface DeleteChatReturnResult {
    id: number,
    title: string,
    avatar: string,
    created_by: number
}

export interface DeleteChatReturn {
    result: DeleteChatReturnResult,
    userId: number
}

export class ChatAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport('/chats');
    }

    getTokenChat(idChat: number): Promise<string> {
        return this.http.post(`/token/${idChat}`);
    }

    addUser(params: AddUserinChatData): Promise<void> {
        return this.http.put('/users', params);
    }

    create(title: CreateChat): Promise<AddChatReturn> {
        return this.http.post('', title);
    }

    delete(chatId: DeleteChat): Promise<DeleteChatReturn> {
        return this.http.delete('', chatId);
    }

    read(params: GetChatsData): Promise<GetChatsReturn[]> {
        return this.http.get('', params);
    }

    update = undefined;
}

export default new ChatAPI();