import instance from "./config";

const paymentApi = {
  createUrlPayment: async (data) => {
    return await instance.post("/create_payment_url", data);
  },
};

export default paymentApi;
