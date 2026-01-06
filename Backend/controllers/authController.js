require("dotenv").config();
const requestIp = require("request-ip");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");
const fetch = require("node-fetch");

const VALID_CREDENTIALS = {
  username: process.env.NAME,
  password: process.env.PASSWORD,
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login Attempt:", { username });

    const clientIp = requestIp.getClientIp(req);

    let ispInfo = {};
    try {
      const ipRes = await fetch(`https://ipapi.co/${clientIp}/json/`);
      ispInfo = await ipRes.json();
    } catch (err) {
      ispInfo = {};
    }

    const geo = geoip.lookup(clientIp) || {
      city: "Localhost",
      country: "Localhost",
    };

    const parser = new UAParser(req.headers["user-agent"]);
    const userAgentResult = parser.getResult();

    const userInfo = {
      ip: clientIp,
      location: `${geo.city}, ${geo.country}`,
      isp: ispInfo.org || "Unknown ISP",
      asn: ispInfo.asn || "Unknown ASN",
      timezone: ispInfo.timezone || "Unknown",
      browser: `${userAgentResult.browser.name} ${userAgentResult.browser.version}`,
      os: `${userAgentResult.os.name} ${userAgentResult.os.version}`,
      device: userAgentResult.device.model
        ? `${userAgentResult.device.vendor} ${userAgentResult.device.model}`
        : "Desktop/Unknown",
      deviceType: userAgentResult.device.type || "Desktop",
    };

    console.log("------------------------------------------------");
    console.log("🚨 NEW LOGIN ATTEMPT DETECTED 🚨");
    console.log("👤 User:", username);
    console.log("🌍 IP:", userInfo.ip);
    console.log("📍 Location:", userInfo.location);
    console.log("📱 Device:", userInfo.device);
    console.log("💻 OS:", userInfo.os);
    console.log("🌐 Browser:", userInfo.browser);
    console.log("🏢 ISP:", userInfo.isp);
    console.log("🧬 ASN:", userInfo.asn);
    console.log("⏱ Timezone:", userInfo.timezone);
    console.log("------------------------------------------------");

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
