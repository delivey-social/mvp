import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import { createRoot } from "react-dom/client";
import Home from "./routes/home";
import { OrderProvider } from "./contexts/OrderContext";
import Entrega from "./routes/entrega";
import Pagamento from "./routes/pagamento";
import Navbar from "./shared-components/navbar";
import Sucesso from "./routes/sucesso";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/entrega",
    element: <Entrega />,
  },
  {
    path: "/pagamento",
    element: <Pagamento />,
  },
  {
    path: "/sucesso",
    element: <Sucesso />,
  },
]);

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<MainComponent />);

function MainComponent() {
  return (
    <OrderProvider>
      <Navbar />
      <RouterProvider router={router} />
    </OrderProvider>
  );
}
