import cors, { CorsOptions } from "cors";
import express from "express";
import "express-async-errors";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined in .env");
}

const corsOptions: CorsOptions = {
  origin: FRONTEND_URL,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.clear();
  console.log(`Server listening on port ${PORT}`);
});

export default app;
