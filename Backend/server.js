const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();


const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(express.json());
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); 
    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
