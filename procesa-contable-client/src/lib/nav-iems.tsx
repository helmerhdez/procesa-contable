import { HomeIcom, InvoiceFilledIcon } from "@/components/icons";
import { NavItem } from "@/types/nav-types";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Inicio",
    path: "/dashboard",
    icon: <HomeIcom className="h-5 w-5" />,
  },
  {
    title: "Facturas",
    path: "/invoices",
    icon: <InvoiceFilledIcon className="h-5 w-5" />,
    haveSubMenu: true,
    subitems: [
      { title: "Todas", path: "/dashboard/invoices/all" },
      { title: "Cargar", path: "/dashboard/invoices/upload" },
    ],
  },
];
