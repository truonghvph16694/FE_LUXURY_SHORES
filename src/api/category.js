import instance from "./config";

const categoryApi = {
  GetAll: async () => {
    return await instance.get(`category`);
  },
  Get: async (id) => {
    return await instance.get(`category/${id}`);
  },
  GetProducts: async (id) =>{
    return await instance.get(`category/${id}/products`)
  },
  Add: async (data) => {
    return await instance.post("category", data);
  },
  Update: async (data) => {
    return await instance.put(`category/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`category/${id}`);
  },
};

export default categoryApi;
