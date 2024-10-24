"use client";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductImageProps = {
  product: Pick<Product, "name" | "imageUrl">;
};

export const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative w-full h-[360px]">
      <Image
        src={product?.imageUrl}
        alt={product?.name}
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
    </div>
  );
};
