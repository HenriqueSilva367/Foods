import Image from "next/image";
import Logo from "../assets/icons/logo.svg";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className=" flex justify-between px-5 pt-6">
      <Image src={Logo} alt="FSW Foods" height={30} width={100} />
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
