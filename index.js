const express = require("express");
const cors = require("cors");
const leadRoutes = require("./routes/lead")
const mongoose = require("mongoose");
const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000","https://algo-match-frontend-brandsmashers-projects.vercel.app","https://algo-match-frontend-git-main-brandsmashers-projects.vercel.app","https://www.algomatch.in/"
      ];
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// app.options("*", cors());
app.use(express.json());

//mongoDB connection
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://brandsmashersdm:7zOgaSxD9pySZtHF@cluster0.b6sfzdm.mongodb.net/AlgoMatchLead?retryWrites=true&w=majority&appName=Cluster0";

// Proper connection function with options
async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // timeout after 10s
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
  }
}

main();
// Example route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use('/api/leads', leadRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
