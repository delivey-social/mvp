import { createBrowserRouter } from "react-router";

import HomeRoute from "./home";
import EntregaRoute from "./entrega";
import PagamentoRoute from "./pagamento";
import SucessoRoute from "./sucesso";

import ROUTES from "./routes";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <HomeRoute />,
  },
  {
    path: ROUTES.detalhesEntrega,
    element: <EntregaRoute />,
  },
  {
    path: ROUTES.pagamento,
    element: <PagamentoRoute />,
  },
  {
    path: ROUTES.sucesso,
    element: <SucessoRoute />,
  },
]);

export default router;
