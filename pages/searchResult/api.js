import request from "../../utils/request";

const api = {
    getRecommendPromotions: async (keyword, category, pageNum, order, longitude, latitude) => {
        const res = await request.get("/promotion/recommend", { page_num: pageNum, keyword: keyword, category: category, order: order, longitude: longitude, latitude: latitude, category: category, keyword: keyword });
        return res.data.data;
    },
    getUsers: async (keyword) => {
        const res = await request.get("/user/list", { keyword: keyword });
        return res.data.data;
    },
    getUser: async (userId) => {
        const res = await request.get(`/user/${userId}`);
        return res.data.data;
    },
    sendComment: async (text, promotionId) => {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("promotion_id", promotionId);
        const res = await request.postForm("/promotion/comment", formData);
        return res.data.data;
    },
}

export default api;