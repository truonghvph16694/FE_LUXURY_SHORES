import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    contentType: "application/json; charset=utf-8",
  },
  //   timeout: 1000,
})

// Thêm một bộ đón chặn request
instance.interceptors.request.use(
    // function (config) {
    //   // Làm gì đó trước khi request dược gửi đi
    //   return config;
    // },
    // function (error) {
    //   // Làm gì đó với lỗi request
    //   return Promise.reject(error);
    // },
    
    function (config) {
      const token  = JSON.parse(localStorage.getItem("token"));
      
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
  
      // Do something before request is sent
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
  // Thêm một bộ đón chặn response
  instance.interceptors.response.use(
    function (response) {
      // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
      // Làm gì đó với dữ liệu response
      if(response && response.data){
      return response.data;
      }
      return response
    },
    function (error) {
      // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
      // Làm gì đó với lỗi response
      return Promise.reject(error);
    }
  );
  

export default instance