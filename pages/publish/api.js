import request from '../../utils/request'

const api = {
    createPromotion: async (text, urls) => {

        const res = await request.postBody("/promotion", { text: text, imgs: urls });
        return res.data;
    },
    editPromotion: async (promotionId, text, urls) => {
        const res = await request.postBody(`/promotion/edit/${promotionId}`, { text: text, imgs: urls });
        return res.data;
    },
    getPromotion: async (promotionId) => {
        const res = await request.get(`/promotion/${promotionId}`);
        return res.data.data;
    },
    uploadPromotion: async (file) => {
        const formData = new FormData();
        formData.append(`file`, file);
        const res = await request.postForm("/file", formData);
        return res.data.data;
    }
}
export default api;