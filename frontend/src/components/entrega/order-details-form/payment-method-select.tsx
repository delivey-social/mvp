import Select from "@/components/ui/select";

export default function PaymentMethodSelect() {
  return (
    <Select
      placeholder="Forma de pagamento"
      defaultValue={"PIX"}
      required
      name="payment_method"
    >
      <option disabled value={""}>
        Forma de pagamento
      </option>
      <option value={"PIX"}>Pix</option>
      {/* <option value={"DEBIT_CARD"}>Débito (no recebimento)</option> */}
      {/*       <option value={"CREDIT_CARD"}>Crédito (no recebimento)</option> */}
    </Select>
  );
}
