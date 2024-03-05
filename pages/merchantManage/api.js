import request from "../../utils/request";

const api = {
    getPromotions: async (pageNum) => {
        const res = await request.get(`/promotion/merchant/all`, { page_num: pageNum });
        return res.data.data;
    },
    changeCategory: async (category) => {
        const res = await request.postParam(`/merchant/category`, { category: category });
        return res.data;
    },
    deletePromotion: async (promotionId) => {
        const res = await request.delete(`/promotion/${promotionId}`);
        return res.data;
    }
}

export default api;