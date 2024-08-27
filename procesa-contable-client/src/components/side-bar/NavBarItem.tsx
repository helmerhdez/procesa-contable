"use client";

import NavBarSubItem from "@/components/side-bar/NavBarSubItem";
import { useRedirect } from "@/lib/hooks/useRedirect ";
import { NavItem } from "@/types/nav-types";

const NavBarItem = ({ item, idx }: { item: NavItem; idx: number }) => {
  const { title, icon, subitems, haveSubMenu, path } = item;
  const { redirect, expanded, isActive } = useRedirect(path, haveSubMenu!, subitems);

  const isLastItem = idx === (subitems && subitems.length - 1);

  return (
    <div className={`${isLastItem && "border-b"} ${!expanded && isLastItem && "pb-4"}`}>
      <li className={`flex items-center space-x-4 ${!isLastItem && "my-3"} list-none font-extrabold hover:bg-accent rounded-lg p-3 relative hover:opacity-100 cursor-pointer ${isActive ? "opacity-100 bg-accent" : "opacity-50"}`} onClick={redirect}>
        {icon}
        <span className="text-sm leading-normal">{title}</span>
        {haveSubMenu && <div className="absolute end-4 text-lg">{expanded ? "-" : "+"}</div>}
      </li>
      {expanded && haveSubMenu && subitems && (
        <div className="ml-9 mb-3 relative">
          {subitems.map((subItem) => (
            <NavBarSubItem key={subItem.path} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBarItem;
