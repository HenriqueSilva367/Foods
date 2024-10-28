"use client";
import Image from "next/image";
import { Restaurant } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type RestaurantImageProps = {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
};

export const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative åw-full h-[215px]">
      <Image
        src={restaurant?.imageUrl}
        alt={restaurant?.name}
        fill
        className="object-cover shadow-md"
      />
      <Button
        size="icon"
        className="absolute left-4 top-4 bg-white text-foreground rounded-full hover:text-white"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="absolute top-4 right-4 bg-muted-foreground rounded-full"
      >
        <HeartIcon size={16} className=" fill-white" />
      </Button>
    </div>
  );
};
