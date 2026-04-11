import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { OrderProvider } from "./contexts/order/OrderProvider";

import router from "./routes";
import Navbar from "./components/navbar";

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
