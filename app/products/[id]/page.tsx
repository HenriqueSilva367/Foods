import Image from "next/image";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { calculateProductPrice, formateCurrency } from "@/app/_helpers/price";
import { ProductImage } from "./_components/product-image";
import { DiscountBadge } from "@/app/_components/discount-badge";

type ProductPageProps = {
  params: {
    id: string;
  };
};

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="">
      <ProductImage product={product} />

      <div className="p-5">
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
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
