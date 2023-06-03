class SessionFunction {
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getToken() {
    return localStorage.getItem("token");
  }

  removeSession = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
}

export const { setToken, setUser, getUser, getToken, removeSession } =
  new SessionFunction();
