import useRestaurantData from "@/features/restaurante/useRestaurantData";
import Text from "@/components/ui/text";

export default function Header() {
  const restaurantName = useRestaurantData();

  return (
    <Text variant="h2" className="mt-6">
      {restaurantName}
    </Text>
  );
}
