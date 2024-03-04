import request from "../../utils/request";

const api = {
    updateLocation: async ({ latitude, longitude }) => {
        const params = {
            latitude,
            longitude
        }
        const res = await request.postParam("/merchant/location", params);
        return res.data;
    }
}
export default api;