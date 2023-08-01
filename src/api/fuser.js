import instance from "./config";

const fuserApi = {
  signin: async (data) => {
    return await instance.post("auth/signin", data);
  },
  logout: async () => {
    return await instance.post("auth/logout")
  }
};

export default fuserApi;
