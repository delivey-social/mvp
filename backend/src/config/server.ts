import cors, { CorsOptions } from "cors";
import express from "express";
import "express-async-errors";

function configureApp() {
  const app = express();

  const FRONTEND_URL = process.env.FRONTEND_URL;
  const DASHBOARD_URL = process.env.DASHBOARD_URL;

  if (!FRONTEND_URL || !DASHBOARD_URL) {
    throw new Error("FRONTEND_URL or DASHBOARD_URL is not defined in .env");
  }

  const corsOptions: CorsOptions = {
    origin: [FRONTEND_URL, DASHBOARD_URL],
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.clear();
    console.log(`Server listening on port ${PORT}`);
  });

  return app;
}

export default configureApp;
