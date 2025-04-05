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
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    axios
      .get<OpenResponse>(`${import.meta.env.VITE_BACKEND_URL}/open`)
      .then((res) => {
        setIsOpen(res.data.isOpen);
      });
  }, []);

  if (!isOpen) {
    return (
      <div className="flex flex-col gap-4 h-screen w-screen bg-white text-center">
        <Navbar />

        <div className="max-w-sm m-auto pb-20 px-10 text-gray-800">
          <img src="/fechado.svg" className="w-48 m-auto mb-6" />
          <p className="font-bold">
            Parece que o restaurante não está aberto nesse momento!
          </p>
          <p className="text-sm bg-emerald-100 text-emerald-900 font-semibold p-2 px-4 mx-auto rounded-md w-fit my-4">
            Tente novamente mais tarde
          </p>
        </div>
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
