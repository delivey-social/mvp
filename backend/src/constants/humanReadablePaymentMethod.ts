import { PaymentMethods } from "../contexts/order/PaymentMethods";

const humanReadablePaymentMethod: Record<PaymentMethods, string> = {
  [PaymentMethods.CartaoCredito]: "Cartão de crédito",
  [PaymentMethods.CartaoDebito]: "Cartão de débito",
  [PaymentMethods.Pix]: "Pix",
};

export default humanReadablePaymentMethod;
