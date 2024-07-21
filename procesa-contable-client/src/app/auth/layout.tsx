import { ChildrenType } from "@/types/children-type";

const AuthLayout = ({ children }: ChildrenType) => {
  return <main className="h-full w-full flex items-center justify-center">{children}</main>;
};

export default AuthLayout;
