import instance from "./config";

const colorApi = {
  GetAll: async () => {
    return await instance.get(`products_color`);
  },
  Get: async (id) => {
    return await instance.get(`products_color/${id}`);
  },
  Add: async (data) => {
    return await instance.post("products_color", data);
  },
  Update: async (data) => {
    return await instance.put(`products_color/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`products_color/${id}`);
  },
};

export default colorApi;
