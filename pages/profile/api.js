import request from "../../utils/request";

const api = {
    getPromotions: async (userId) => {
        const res = await request.get(`/promotion/user/${userId}`);
        return res.data.data;
    },
    getUser: async (userId) => {
        const res = await request.get(`/user/${userId}`);
        return res.data.data;
    },
    follow: async (userId) => {
        const res = await request.postParam(`/user/follow/${userId}`)
        return res.data;
    },
    followCancel: async (userId) => {
        const res = await request.postParam(`/user/follow_cancel/${userId}`)
        return res.data;
    },
    sendComment2Merchant: async (merchantId, text, imgs, star) => {
        const formData = new FormData();
        imgs.forEach((file, idx) => {
            formData.append(`files`, file);
        })
        formData.append("text", text);
        formData.append("star", star);
        const res = await request.postForm(`/merchant/${merchantId}/comment`, formData)
        return res.data.data;
    },
    getComments2Merchant: async (merchantId) => {
        const res = await request.get(`/merchant/${merchantId}/comment`);
        return res.data.data;
    },
    getUserComments2Merchant: async (userId) => {
        const res = await request.get(`/user/${userId}/merchant/comment`);
        return res.data.data;
    },
    getFollowList: async (userId) => {
        const res = await request.get(`/user/${userId}/follow/list`);
        return res.data.data;
    },
}

export default api;