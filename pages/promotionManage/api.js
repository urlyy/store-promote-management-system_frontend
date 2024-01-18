import request from "../../utils/request";

const api = {
    getPromotions: async (userId) => {
        const res = await request.get(`/promotion/user/${userId}`);
        return res.data.data;
    },
}

export default api;