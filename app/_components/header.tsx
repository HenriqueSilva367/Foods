import Image from "next/image";
import Logo from "../assets/icons/logo.svg";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className=" flex justify-between px-5 pt-6">
      <div className="relateve h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src={Logo}
            alt="FSW Foods"
            height={30}
            width={100}
            className="object-cover"
          />
        </Link>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};
