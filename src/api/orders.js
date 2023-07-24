import instance from "./config";

const ordersApi = {
  GetAll: async () => {
    return await instance.get("orders");
  },
  Get: async (id) => {
    return await instance.get(`orders/${id}`);
  },
  Add: async (data) => {
    return await instance.post("orders", data);
  },
  Update: async (data) => {
    return await instance.patch(`orders/${data._id}`, data);
  },
//   Remove: async (id) => {
//     return await instance.delete(`orders/${id}`);
//   },
};

export default ordersApi;
