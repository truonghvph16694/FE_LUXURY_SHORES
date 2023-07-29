import instance from "./config";

const billApi = {
  GetAll: async () => {
    return await instance.get(`bills`);
  },
  Get: async (id) => {
    return await instance.get(`bills/${id}`);
  },
  Add: async (data) => {
    return await instance.post("bills", data);
  },
  Update: async (data) => {
    return await instance.put(`bills/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`bills/${id}`);
  },
};

export default billApi;
