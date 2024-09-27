import Image from "next/image";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import { formateCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

type RestaurantItemProp = {
  restaurant: Restaurant;
};
export const RestaurantItem = async ({ restaurant }: RestaurantItemProp) => {
  return (
    <div className="min-w-[266px] max-w-[266px]">
      <div className="w-full h-[136px] relative">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover rounded-lg shadow-md"
        />

        <div className="flex gap-[2px] items-center absolute top-2 left-2 py-[2px] px-2 rounded-full bg-white text-black">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
          <span className="font-semibold text-xs">5.0</span>
        </div>

        <Button
          size="icon"
          className="absolute top-2 right-2 bg-muted-foreground rounded-full w-7 h-7"
        >
          <HeartIcon size={16} className=" fill-white" />
        </Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <BikeIcon className=" text-primary text-xs" size={14} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formateCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <TimerIcon className=" text-primary text-xs" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
