import { PaymentMethods } from "../types/PaymentMethods";

const humanReadablePaymentMethod: Record<PaymentMethods, string> = {
  [PaymentMethods.CREDIT_CARD]: "Cartão de crédito",
  [PaymentMethods.DEBIT_CARD]: "Cartão de débito",
  [PaymentMethods.PIX]: "Pix",
};

export default humanReadablePaymentMethod;
