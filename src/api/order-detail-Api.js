import instance from "./config";

const order_detail_api = {
  GetAll: async () => {
    return await instance.get(`order-detail`);
  },
  Get: async (id) => {
    return await instance.get(`order-detail/${id}`);
  },
  Add: async (data) => {
    return await instance.post("order-detail", data);
  },
  Update: async (data) => {
    return await instance.put(`order-detail/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`order-detail/${id}`);
  },
};

export default order_detail_api;
