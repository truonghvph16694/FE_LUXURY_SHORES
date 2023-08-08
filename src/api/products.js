import instance from "./config";

const productApi = {
  GetAll: async () => {
    return await instance.get("products");
  },
  Get: async (id) => {
    return await instance.get(`products/${id}`);
  },
    GetEdit: async (id) => {
    return await instance.get(`products-edit/${id}`);
  },

  Add: async (data) => {
    return await instance.post("products", data);
  },
  Update: async (data) => {
    return await instance.put(`products/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`products/${id}`);
  },
};

export default productApi;
