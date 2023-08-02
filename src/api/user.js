import instance from "./config";

const userApi = {
  GetAll: async () => {
    return await instance.get(`user`);
  },
  Get: async (id) => {
    return await instance.get(`user/${id}`);
  },
  Add: async (data) => {
    return await instance.post("user", data);
  },
  Update: async (data) => {
    return await instance.put(`user/${data._id}`, data);
  },
  editStatus: async (id,data) => {
    return await instance.put(`user/status/${id}`, data);
  },
  Remove: async (id) => {
    return await instance.delete(`user/${id}`);
  },
  signin: async (data) => {
    return await instance.post("auth/signin", data);
  },
  signup: async (data) => {
    return await instance.post("auth/signup", data);
  },
  logout: async () => {
    return await instance.post("auth/logout")
  }
};

export default userApi;
