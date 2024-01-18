import request from '../../utils/request'

const api = {
    createPromotion: async (files, text) => {
        const formData = new FormData();
        files.forEach((file, idx) => {
            formData.append(`files`, file);
        })
        formData.append("text", text);
        const res = await request.postForm("/promotion", formData);
        return res.data;
    }
}
export default api;