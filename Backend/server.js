const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
