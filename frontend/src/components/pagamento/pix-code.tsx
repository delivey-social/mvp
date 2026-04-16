import { useEffect, useState } from "react";
import Notification from "../ui/notification";

export default function PixCode() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!showNotification) return;

    setTimeout(() => setShowNotification(false), 2000);
  }, [showNotification]);

  const CHAVE_PIX =
    "00020126360014BR.GOV.BCB.PIX0114209486940001095204000053039865802BR5901N6001C62070503***63048600";

  return (
    <>
      <Notification isOpen={showNotification}>Chave PIX copiada!</Notification>

      <div className="bg-white mx-auto font-bold flex items-center justify-between p-2 px-4 rounded-xl drop-shadow-md w-full">
        <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-center">
          {CHAVE_PIX}
        </p>

        <img
          src="/copy.svg"
          onClick={() => {
            navigator.clipboard.writeText(CHAVE_PIX);
            setShowNotification(true);
          }}
          className="w-5 hover:opacity-50 cursor-pointer transition-opacity"
        />
      </div>
    </>
  );
}
