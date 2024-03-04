import request from "../../utils/request";

const api = {
    getPromotionsFromFollow: async (pageNum) => {
        const res = await request.get("/promotion/follow", { page_num: pageNum });
        return res.data.data;
    }
}

export default api;