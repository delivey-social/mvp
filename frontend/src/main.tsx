import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import { createRoot } from "react-dom/client";
import Home from "./routes/home";
import { OrderProvider } from "./contexts/OrderContext";
import Entrega from "./routes/entrega";
import Pagamento from "./routes/pagamento";
import Navbar from "./shared-components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

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
]);

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<MainComponent />);

interface OpenResponse {
  isOpen: boolean;
}

function MainComponent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_URL);
    axios
      .get<OpenResponse>(`${import.meta.env.VITE_BACKEND_URL}/open`)
      .then((res) => {
        setIsOpen(res.data.isOpen);
      });
  }, []);

  if (!isOpen) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen bg-red-800 text-white font-bold text-xl text-center">
        <p className="max-w-sm">
          Parece que o restaurante não está aberto nesse momento! Tente
          novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <OrderProvider>
      <Navbar />
      <RouterProvider router={router} />
    </OrderProvider>
  );
}
