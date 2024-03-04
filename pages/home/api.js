import request from "../../utils/request";

const api = {
    getRecommendPromotions: async (latitude, longitude, pageNum) => {
        const res = await request.get("/promotion/recommend", { page_num: pageNum, latitude: latitude, longitude: longitude });
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