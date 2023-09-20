import instance from "./config";

const mailOrder = {
  sendmailCreate: async (data) => {
    return await instance.post(`send-mail-create`, data);
  },
  sendMailFinish: async (data) => {
    return await instance.post(`send-mail-finish`, data);
  },
};

export default mailOrder;
