import instance from "./config";

const sizeApi = {
  GetAll: async () => {
    return await instance.get(`products_size`);
  },
  Get: async (id) => {
    return await instance.get(`products_size/${id}`);
  },
  Add: async (data) => {
    return await instance.post("products_size", data);
  },
  Update: async (data) => {
    return await instance.put(`products_size/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`products_size/${id}`);
  },
};

export default sizeApi;
