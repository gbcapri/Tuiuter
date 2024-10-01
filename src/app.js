import e from "express";
import "dotenv/config";
import "./config/db.js"
import user_router from "./routes/user-route.js"

const app = e();

app.use(e.json());
app.use("/user", user_router)

app.listen(process.env.API_PORT, () => console.log("Server running"));