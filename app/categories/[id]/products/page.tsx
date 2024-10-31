import { Category } from "@/app/_components/category-list";
import { Header } from "@/app/_components/header";
import { ProductItem } from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

type CategoriesPageProps = {
  params: {
    id: string;
  };
};

const CategoreisPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      Product: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold mb-6">{Category.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {category?.Product.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoreisPage;
