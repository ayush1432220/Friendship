const VALID_CREDENTIALS = {
  username: "Doraemon",
  password: "162627",
};

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login Attempt:", { username });

    if (
      (username === VALID_CREDENTIALS.username ||
        username.toLowerCase() === VALID_CREDENTIALS.username.toLowerCase()) &&
      String(password) === VALID_CREDENTIALS.password
    ) {
      return res.status(200).json({
        success: true,
        message: "Login Successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password. Please try again.",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { loginUser };
