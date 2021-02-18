import axiosInterceptor from "./axiosInterceptor";

class ApiCalls {
  static signup(payload) {
    return axiosInterceptor({
      url: "/public/register",
      method: "POST",
      data: payload,
    }).then((response) => response.data);
  }
  static login(payload) {
    return axiosInterceptor({
      url: "/public/login",
      method: "POST",
      data: payload,
    }).then((response) => response.data);
  }
  static getUserProfile() {
    return axiosInterceptor({
      url: "/user",
      method: "GET",
    }).then((response) => response.data);
  }
  static saveTimeSlots(payload) {
    return axiosInterceptor({
      url: "/user/my-slots",
      data: payload,
      method: "POST",
    }).then((response) => response.data);
  }
  static updateProfilePicture(model) {
    return axiosInterceptor({
      url: "/user/profile-pic",
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: model,
    }).then((response) => response.data);
  }
  static updateProfile(model) {
    return axiosInterceptor({
      url: "/user",
      method: "POST",
      data: model,
    }).then((response) => response.data);
  }
  static getAppointments(params) {
    return axiosInterceptor({
      url: "/appointment",
      method: "GET",
      params: params,
    }).then((response) => response.data);
  }
}
export default ApiCalls;
