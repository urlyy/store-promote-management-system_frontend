import request from "../../utils/request";

const api = {
    getNotifications: async () => {
        const res = await request.get(`/notification`);
        return res.data.data;
    },
    getUser: async (userId) => {
        const res = await request.get(`/user/${userId}`);
        return res.data.data;
    },
}

export default api;