import { OrderDotsVerticalFilled } from "@/components/icons";
import NavBar from "@/components/side-bar/NavBar";
import NavBarItem from "@/components/side-bar/NavBarItem";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { NAV_ITEMS } from "@/lib/nav-iems";
import Image from "next/image";

const SideBar = () => {
  const authContext = useAuth();
  const { user, logout } = authContext!;
  return (
    <aside className="h-screen flex flex-col justify-between border-r shadow-sm px-4">
      <section className="w-full flex border-b px-3 py-5 items-center justify-evenly">
        <Image src="/procesa-contable.svg" width={25} height={25} alt="Screenshots of the dashboard project showing desktop version" />
        <h1 className="font-semibold text-base">Procesa Contable</h1>
      </section>
      <NavBar>
        <div className="mt-6">
          <span className="font-extrabold text-xs opacity-60">MENÚ</span>
        </div>
        {NAV_ITEMS.map((item, idx) => {
          return <NavBarItem key={item.path} item={item} idx={idx} />;
        })}
      </NavBar>
      <section className="w-full flex justify-between border-t py-3">
        <div className="leading-4">
          <h4 className="font-semibold">{user?.name!}</h4>
          <small className="opacity-60 text-xs">{user?.sub!}</small>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <OrderDotsVerticalFilled />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">Mi perfil</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </aside>
  );
};

export default SideBar;
