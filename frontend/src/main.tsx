import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import { createRoot } from "react-dom/client";
import Home from "./routes/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<RouterProvider router={router} />);
