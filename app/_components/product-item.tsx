"use Client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { calculateProductPrice, formateCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

type ProductItemProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
};

export const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("min-w-[150px] w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className="space-y-2 ">
        <div className="aspect-square w-full relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-md"
          />

          {product.discountPercentage && (
            <div className="flex gap-[2px] items-center absolute top-2 left-2 bg-primary py-[2px] px-2 rounded-full text-white">
              <ArrowDownIcon size={12} />
              <span className="font-semibold text-xs">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <div>
          <h2 className="truncate text-sm">{product.name}</h2>

          <div className="flex gap-1 items-center">
            <h3 className="font-semibold">
              {formateCurrency(calculateProductPrice(product))}
            </h3>

            {product.discountPercentage > 0 && (
              <span
                className="line-through 
              text-muted-foreground 
              text-xs"
              >
                {formateCurrency(Number(product.price))}
              </span>
            )}
          </div>
          <span className=" block text-muted-foreground text-xs">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
};
