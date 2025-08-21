import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast, {} from "react-hot-toast"
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:8080";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,
    login: async(data) => {
        await axiosInstance.post("/auth/login", {
            email: data.email,
            password: data.password
        })
        .then((data) => {
            set({ isLoggingIn: true });
            if(data.data.success) {
                localStorage.setItem("auth_token", data.data.token);
                get().connectSocket();
                toast.success(data.data.message);
            } else {
                toast.error(data.data.message);
            }
        })
        .catch((e) => {
            toast.error(e.message);
        })
        .finally(() => {
            set({ isLoggingIn: false });
        });
    },

    signup: async(data) => {
        await axiosInstance.post("/auth/register", {
            full_name: data.full_name,
            email: data.email,
            password: data.password
        })
        .then((data) => {
            set({ isSigningUp: true });
            if(data.data.success) {
                localStorage.setItem("auth_token", data.data.token);
                get().connectSocket();
                toast.success(data.data.message);
            } else {
                toast.error(data.data.message);
            }
        })
        .catch((e) => {
            toast.error(e.message);
        })
        .finally(() => {
            set({ isSigningUp: false });
        });
    },

    getUser: async() => {
        const auth_token = localStorage.getItem("auth_token");
        await axiosInstance.get("/auth/check", {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
        .then((data) => {
            set({ authUser: data.data });
            get().connectSocket();
        })
        .catch((e) => {
            toast.error(e.message);
            set({ authUser: null });
        })
        .finally(() => {
            set({ isCheckingAuth: false });
        });
    },

    logout: async() => {
        localStorage.removeItem("auth_token");
        set({ authUser: null });
        set({ isCheckingAuth: true });
        get().disconnectSocket();

        toast.success("Logged out successfully");
    },

    updateProfile: async(data) => {
        const auth_token = localStorage.getItem("auth_token");
        await axiosInstance.put("/auth/update-profile", {
            profilePic: data.profilePic
        }, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
        .then((data) => {
            set({ isUpdatingProfile: true });
            if(data.data.success) {
                toast.success(data.data.message);
            } else {
                toast.error(data.data.message);
            }
        })
        .catch((e) => {
            toast.error(e.message);
        })
        .finally(() => {
            set({ isUpdatingProfile: false });
        })
    },

    connectSocket: () => {
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();

    },

})); 