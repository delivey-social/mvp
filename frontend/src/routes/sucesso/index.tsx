import Text from "@/components/ui/text";

export default function Sucesso() {
  return (
    <div className="text-center mt-24 max-w-xs mx-auto">
      <img src="/sucesso.svg" className="w-48 m-auto mb-6" />

      <p className="text-sm bg-emerald-100 text-emerald-900 font-semibold p-2 px-4 mx-auto rounded-md w-fit my-4">
        Seu pedido foi confirmado!
      </p>

      <Text className="font-bold">
        Já enviamos as informações para a cozinha e logo mais chega até você!
      </Text>
    </div>
  );
}
