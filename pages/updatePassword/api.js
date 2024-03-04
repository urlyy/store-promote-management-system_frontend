import request from '../../utils/request'

const api = {
    updatePassword: async (oldPassword, newPassword) => {
        const formData = new FormData();
        formData.append("old", oldPassword);
        formData.append("new", newPassword);
        const res = await request.postForm("/user/password", formData);
        return res.data;
    }
}
export default api;