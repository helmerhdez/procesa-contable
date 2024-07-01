import { useRedirect } from "@/lib/hooks/useRedirect ";
import { NavItem } from "@/types/nav-types";

const NavBarSubItem = ({ item }: { item: NavItem }) => {
  const { title, path } = item;
  const { redirect, isActive } = useRedirect(path, false!);

  return (
    <li className={`flex items-center list-none px-3 py-1 font-extrabold hover:opacity-100 cursor-pointer ${isActive ? "opacity-100" : "opacity-50"}`} onClick={redirect}>
      <span className="text-sm leading-normal">{title}</span>
    </li>
  );
};

export default NavBarSubItem;
