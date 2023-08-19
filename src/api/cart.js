import instance from "./config";

const cartApi = {
  GetCartUser: async (user_id) => {
    return await instance.get(`carts/user/${user_id}`);
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
  ChangeQuantity: async (data) => {
    return await instance.patch(`carts/change-quantity/${data._id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`carts/${id}`);
  },
};

export default cartApi;
