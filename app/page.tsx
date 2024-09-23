import Image from "next/image";
import { Category } from "./_components/category-list";
import { Header } from "./_components/header";
import { Search } from "./_components/search";
import Banner from "./assets/promo-banner-01.svg";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <Category />
      </div>

      <Image
        src={Banner}
        alt="Até 30% de desconto em pizzas"
        height={0}
        width={0}
        className="h-auto w-full"
        sizes="100vw"
        quality={100}
      />
    </>
  );
}
