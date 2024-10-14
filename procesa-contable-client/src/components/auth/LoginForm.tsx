"use client";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import { LoginType } from "@/types/auth/auth-types";
import { LoginSchema } from "@/types/auth/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const LoginForm = () => {
  const authContext = useAuth();
  const router = useRouter();
  const { login } = authContext!;
  const [isVisible, setIsVisible] = useState(false);

  const togleShowPassword = () => setIsVisible(!isVisible);

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginType) => {
    toast.promise(login(values), {
      loading: "Iniciando sesión...",
      success: (response) => {
        if (response?.success) {
          router.push(DASHBOARD_ROUTE);
          return response?.success;
        } else {
          throw new Error(response?.error || "Usuario y/o contraseña incorrectos");
        }
      },
      error: (err) => {
        return `Error: ${err.message}`; // Mensaje de error formateado
      },
    });
  };

  return (
    <CardWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input {...field} placeholder="you@example.com" type="email" className="w-full" />
                      <MailIcon className="text-2xl absolute end-2.5 text-default-400 pointer-events-none flex-shrink-0" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input {...field} placeholder="***********" type={isVisible ? "text" : "password"} className="w-full" />
                      <button type="button" onClick={togleShowPassword} className="absolute end-2.5">
                        {isVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> : <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
