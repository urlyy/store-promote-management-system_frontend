import request from "../../utils/request";

const api = {
    getFollowList: async (userId) => {
        const res = await request.get(`/user/${userId}/follow/list`);
        return res.data.data;
    },
    follow: async (userId) => {
        const res = await request.postParam(`/user/follow/${userId}`)
        return res.data;
    },
    followCancel: async (userId) => {
        const res = await request.postParam(`/user/follow_cancel/${userId}`)
        return res.data;
    }
}

export default api;