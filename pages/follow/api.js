import request from "../../utils/request";

const api = {
    getFollowList: async (userId) => {
        const res = await request.get(`/user/${userId}/follow/list`);
        return res.data.data;
    },

}

export default api;