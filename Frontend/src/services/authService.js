const AuthService = {
  login: async (username, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        AuthService.createSession();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  createSession: () => {
    const sessionToken = btoa(`${Date.now()}-${Math.random()}`);
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
    sessionStorage.setItem("auth_token", sessionToken);
    sessionStorage.setItem("auth_expiry", expiryTime.toString());
    return sessionToken;
  },

  validateSession: () => {
    const token = sessionStorage.getItem("auth_token");
    const expiry = sessionStorage.getItem("auth_expiry");

    if (!token || !expiry) return false;

    if (Date.now() > parseInt(expiry)) {
      AuthService.clearSession();
      return false;
    }

    return true;
  },

  clearSession: () => {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_expiry");
  },
};

export default AuthService;
