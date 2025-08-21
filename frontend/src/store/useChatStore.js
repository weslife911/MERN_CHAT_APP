import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    users: [],
    messages: [],

    getUsers: async() => {
        const auth_token = localStorage.getItem("auth_token");
        await axiosInstance.get("/auth/users", {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
        .then((data) => {
            set({ isUsersLoading: true });
            set({ users: data.data })
        })
        .catch((e) => {
            console.log(e)
            toast.error(e.message);
        })
        .finally(() => {
            set({ isUsersLoading: false });
        })
    },
    
    setSelectedUser: async(user) => {
        set({ selectedUser: user });
    },

    sendMessage: async(data, id) => {
        const { messages } = get();
        const auth_token = localStorage.getItem("auth_token");
        await axiosInstance.post(`/messages/send/${id}`, {
            text: data.text,
            image: data.image || ""
        }, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
        .then((data) => {
            if(data.data.success) {
                toast.success(data.data.message);
                set({ messages: [...messages, data.data.newMessage] });
            } else {
                toast.error(data.data.message);
            }
        })
        .catch((e) => {
            console.log(e)
            toast.error(e.message);
        })
    },

    subscribeToMessages: async() => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;
            set({ messages: [...get().messages, newMessage] });
        });
    },

    unsubscribeFromMessages: async() => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    getMessages: async(id) => {
        const auth_token = localStorage.getItem("auth_token");
        await axiosInstance.get(`/messages/${id}`, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
        .then((data) => {
            set({ isMessagesLoading: true });
            set({ messages: data.data })
        })
        .catch((e) => {
            console.log(e)
            toast.error(e.message);
        })
        .finally(() => {
            set({ isMessagesLoading: false });
        });
    },

}));