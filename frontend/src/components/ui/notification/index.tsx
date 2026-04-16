import clsx from "clsx";
import Text from "../text";

interface NotificationProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function Notification({ children, isOpen }: NotificationProps) {
  return (
    <div
      className={clsx(
        `absolute w-86 h-10 border-2 border-gray-400 left-1/2 flex items-center justify-between text-center z-10 top-0 rounded-md -translate-x-1/2 bg-gray-50  transition-all`,
        isOpen ? "opacity-100" : "opacity-0",
      )}
    >
      <Text className="mx-auto text-center font-bold">{children}</Text>
    </div>
  );
}
