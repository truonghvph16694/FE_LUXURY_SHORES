import instance from "./config";

const paymentApi = {
  createUrlPayment: async (data) => {
    return await instance.post("/create_payment_url", data);
  },
  changStatusPayment: async (data) => {
    return await instance.get(
      "/vnpay_checkout_result/" +
        data.id +
        "?vnp_ResponseCode=" +
        data.vnp_ResponseCode
    );
  },
};

export default paymentApi;
