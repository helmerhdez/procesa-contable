import { ChildrenType } from "@/types/children-type";

const NavBar = ({ children }: ChildrenType) => {
  return (
    <header className="h-full">
      <nav className="h-full">{children}</nav>
    </header>
  );
};

export default NavBar;
