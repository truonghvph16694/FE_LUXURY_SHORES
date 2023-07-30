import instance from "./config";

const FeedbackApi = {
  GetAll: async () => {
    return await instance.get("feedback");
  },
  Get: async (id) => {
    return await instance.get(`feedback/${id}`);
  },
  Add: async (data) => {
    return await instance.post("feedback", data);
  },
  Update: async (data) => {
    return await instance.patch(`feedback/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`feedback/${id}`);
  },
};

export default FeedbackApi;
