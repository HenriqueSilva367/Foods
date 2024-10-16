import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

type DiscountBadgeProps = {
  product: Pick<Product, "discountPercentage">;
};
export const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <div className="flex gap-[2px] items-center bg-primary py-[2px] px-2 rounded-full text-white">
      <ArrowDownIcon size={12} />
      <span className="font-semibold text-xs">
        {product.discountPercentage}%
      </span>
    </div>
  );
};
