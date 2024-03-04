import request from "../../utils/request";

const api = {
    getRecommendPromotions: async () => {
        const res = await request.get("/promotion/recommend");
        return res.data.data;
    },
    getUser: async (userId) => {
        const res = await request.get(`/user/${userId}`);
        return res.data.data;
    },
    getPromotion: async (promotionId) => {
        const res = await request.get(`/promotion/${promotionId}`);
        return res.data.data;
    },
    sendComment: async (text, promotionId) => {
        console.log(promotionId, text);
        const formData = new FormData();
        formData.append("text", text);
        const res = await request.postForm(`/promotion/${promotionId}/comment`, formData);
        return res.data.data;
    },
    getComments: async (promotionId) => {
        const res = await request.get(`/promotion/${promotionId}/comment`);
        return res.data.data;
    },
    likePromotion: async (promotionId) => {
        const res = await request.postParam(`/promotion/${promotionId}/like`);
        return res.data;
    },
    likeCancelPromotion: async (promotionId) => {
        const res = await request.postParam(`/promotion/${promotionId}/like_cancel`);
        return res.data;
    },

}

export default api;