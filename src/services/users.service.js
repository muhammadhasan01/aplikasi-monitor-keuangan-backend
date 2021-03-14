import http from "../http-common";

class UserDataService {
  getUsers() {
    return http.get("");
  }

  getSubusers() {
    return http.get("/subunits");
  }

  createUser(data) {
    return http.post("", data);
  }

  getUserBy(id) {
    return http.get(`/${id}`);
  }

  getUpdateUser(id, data) {
    return http.put(`/${id}`, data);
  }

  deleteUser(id) {
    return http.delete(`/${id}`);
  }
}

export default new UserDataService();