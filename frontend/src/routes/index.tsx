import { createBrowserRouter } from "react-router";

import HomeRoute from "./home";
import EntregaRoute from "./entrega";
import PagamentoRoute from "./pagamento";
import SucessoRoute from "./sucesso";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
  },
  {
    path: "/entrega",
    element: <EntregaRoute />,
  },
  {
    path: "/pagamento",
    element: <PagamentoRoute />,
  },
  {
    path: "/sucesso",
    element: <SucessoRoute />,
  },
]);

export default router;
