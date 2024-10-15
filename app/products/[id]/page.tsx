import Image from "next/image";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

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
      <div className="relative w-full h-[360px]">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          fill
          className="object-cover rounded-lg shadow-md"
        />

        <Button
          size="icon"
          className="absolute left-4 top-4 bg-white text-foreground rounded-full hover:text-white"
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="p-5">
        <div className="flex items gap-2">
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
      </div>
    </div>
  );
};

export default ProductPage;
