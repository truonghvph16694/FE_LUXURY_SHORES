import instance from "./config";

const cartApi = {
  GetAll: async () => {
    return await instance.get(`carts`);
  },
  Get: async (id) => {
    return await instance.get(`carts/${id}`);
  },

  Add: async (data) => {
    return await instance.post("carts", data);
  },
  Update: async (data) => {
    return await instance.put(`carts/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`carts/${id}`);
  },
};

export default cartApi;
