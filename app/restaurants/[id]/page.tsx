import Image from "next/image";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { RestaurantImage } from "./_components/restaurant-image";
import { StarIcon } from "lucide-react";
import { DeliveryInfo } from "@/app/_components/delivery-info";

type RestaurantPageProps = {
  params: {
    id: string;
  };
};

const Restaurantpage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });

  if (!restaurant) {
    return notFound;
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <div className="flex justify-between items-center px-5 pt-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="font-semibold text-xl">{restaurant.name}</h1>
        </div>
        <div className="flex gap-[3px] items-center top-2 bg-foreground text-white left-2 py-[2px] px-2 rounded-full bg-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
          <span className="font-semibold text-xs">5.0</span>
        </div>
      </div>
      <DeliveryInfo restaurant={restaurant} />

      <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5 mt-3">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#f4f4f4] min-w-[167px] rounded-lg text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurantpage;
