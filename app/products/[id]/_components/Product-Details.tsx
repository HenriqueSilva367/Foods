"use client";
import { DeliveryInfo } from "@/app/_components/delivery-info";
import { DiscountBadge } from "@/app/_components/discount-badge";
import { ProductList } from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { calculateProductPrice, formateCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
};

export const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((currencyState: number) => currencyState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((currencyState: number) => {
      if (currencyState === 1) return 1;
      return currencyState - 1;
    });

  return (
    <div className="p-5 relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="font-semibold mt-1 text-xl mb-2">{product.name}</h1>

      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl">
              {formateCurrency(calculateProductPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            De: {formateCurrency(Number(product.price))}
          </p>
        </div>
        <div className="flex gap-2 items-center text-center">
          <Button
            onClick={handleDecreaseQuantityClick}
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button onClick={handleIncreaseQuantityClick} size="icon">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <DeliveryInfo restaurant={product.restaurant} />
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      <div className="mt-6 space-y-3">
        <p>Sucos</p>
        <ProductList products={complementaryProducts} />
      </div>
      <div className="px-5 mt-6">
        <Button className="w-full font-semibold">Adicionar a sacola</Button>
      </div>
    </div>
  );
};
