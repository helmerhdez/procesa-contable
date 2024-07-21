import { getUserData, login, logout } from "@/actions/auth";
import { LOGIN_ROUTE } from "@/lib/constants";
import { AuthContextType, CustomJwtPayload, LoginType } from "@/types/auth/auth-types";
import { ChildrenType } from "@/types/children-type";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const loginHandler = async (values: LoginType) => {
    try {
      const response = await login(values);
      if (response.success) {
        setUser(response.user);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logoutHandler = async () => {
    const res = await logout();
    if (res) {
      router.push(LOGIN_ROUTE);
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, login: loginHandler, logout: logoutHandler }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
