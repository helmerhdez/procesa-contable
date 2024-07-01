"use client";

import ThemeToggle from "@/components/header/ThemeToggle";
import { HomeIcom, SlashIcon } from "@/components/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { PRIVATE_ROUTES } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NavMenu = ({ className }: { className: string }) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const parentPath = useMemo(() => (pathNames.length > 1 ? pathNames[pathNames.length - 2] : pathNames[0]), [pathNames]);
  const foundRoute = useMemo(() => PRIVATE_ROUTES.find((route) => route.path === `/${parentPath}`), [parentPath]);

  return (
    <header className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          <Link href={"/dashboard"}>
            <BreadcrumbItem className="py-1">
              <HomeIcom className={`h-5 w-5 ${pathNames.length === 1 && "text-primary"}`} />
            </BreadcrumbItem>
          </Link>
          {foundRoute && foundRoute.path !== paths && (
            <>
              <BreadcrumbSeparator aria-hidden="true">
                <SlashIcon />
              </BreadcrumbSeparator>
              <Link href={foundRoute.path}>
                <BreadcrumbItem>{foundRoute.title}</BreadcrumbItem>
              </Link>
              <BreadcrumbSeparator aria-hidden="true">
                <SlashIcon />
              </BreadcrumbSeparator>
              {foundRoute.haveSubMenu && (
                <BreadcrumbItem>
                  <BreadcrumbPage className="border rounded px-2 py-1 font-extrabold">{foundRoute.subitems?.find((item) => item.path.endsWith(`/${pathNames[pathNames.length - 1]}`))?.title || "Breadcrumb"}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <ThemeToggle />
    </header>
  );
};

export default NavMenu;
