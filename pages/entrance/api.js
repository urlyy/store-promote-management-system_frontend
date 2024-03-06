import request from "../../utils/request";

const api = {
    login: async (username, password) => {

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password)
        console.log(username, password)
        const resp = await request.postForm("/user/login", formData);
        return resp.data;
    },
    register: async (username, password, gender) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("gender", gender);
        const resp = await request.postForm("/user/register", formData);
        return resp.data;
    }
}


export default api