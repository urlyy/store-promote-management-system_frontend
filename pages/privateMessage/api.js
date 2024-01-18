import request from "../../utils/request";

const api = {
    getMessages: async (userId) => {
        const res = await request.get(`/private_msg/user/${userId}`);
        return res.data.data;
    },
    getUnreadMessags: async (userId) => {
        const res = await request.get(`/private_msg/user/${userId}`);
        return res.data.data;
    },
    getUser: async (userId) => {
        const res = await request.get(`/user/${userId}`);
        return res.data.data;
    },
    sendText: async (userId, text) => {
        const formData = new FormData();
        formData.append("text", text)
        formData.append("user_id", userId)
        const res = await request.postForm(`/private_msg/text`, formData)
        return res.data.data;
    },
    sendImage: async (userId, img) => {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("user_id", userId);
        const res = await request.postForm(`/private_msg/img`, formData)
        return res.data.data;
    }
}

export default api;