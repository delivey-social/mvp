import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { OrderProvider } from "./contexts/OrderContext";

import router from "./routes";
import Navbar from "./shared-components/navbar";

import "./index.css";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<Main />);

export default function Main() {
  return (
    <OrderProvider>
      <Navbar />

      <RouterProvider router={router} />
    </OrderProvider>
  );
}
