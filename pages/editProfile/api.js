import request from "../../utils/request";

const api = {
    updateProfile: async (username, brief, age, gender) => {
        const res = await request.postParam("/user/profile", {
            username: username,
            brief: brief,
            age: age,
            gender: gender
        });
        return res.data;
    }
}

export default api;