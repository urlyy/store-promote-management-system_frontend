import request from "../../utils/request";

const api = {
    beMerchant: async (latitude, longitude) => {
        const url = "/merchant"
        const res = await request.postParam(url, { latitude: latitude, longitude: longitude });
        return res.data;
    },
    changeAvatar: async (file) => {
        const formData = new FormData();
        formData.append(`file`, file);
        const res = await request.postForm("/user/avatar", formData);
        return res.data.data;
    }
}
export default api;