import instance from "./config";

const categoryApi = {
  GetAll: async () => {
    return await instance.get("categories");
  },
  Get: async (id) => {
    return await instance.get(`categories/${id}`);
  },
  Add: async (data) => {
    return await instance.post("categories", data);
  },
  Update: async (data) => {
    return await instance.put(`categories/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`categories/${id}`);
  },
};

export default categoryApi;
