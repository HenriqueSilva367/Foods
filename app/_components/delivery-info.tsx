import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";
import { formateCurrency } from "../_helpers/price";

type DeliveryInfoProps = {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
};
export const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="flex justify-around py-2 mt-6">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Entrega</span>
          <BikeIcon size={14} />
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="font-semibold">
            {formateCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-sm font-semibold">Grátis</p>
        )}
      </div>
      <div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Entrega</span>
          <TimerIcon />
        </div>
        <span className="font-semibold">
          {Number(restaurant.deliveryTimeMinutes)} min
        </span>
      </div>
    </Card>
  );
};
