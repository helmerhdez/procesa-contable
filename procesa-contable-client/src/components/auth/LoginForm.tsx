"use client";

import { login } from "@/actions/auth";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { FormErrorAlert } from "@/components/auth/FormAlerts";
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
import { AuthActionType, LoginFormType } from "@/types/auth/auth-types";
import { LoginSchema } from "@/types/auth/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
export const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const togleShowPassword = () => setIsVisible(!isVisible);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormType) => {
    setErrorMessage("");

    startTransition(() => {
      login(values).then((data: AuthActionType) => {
        if (data.success) {
          toast({
            description: data.success,
          });
          router.push("/dashboard");
        } else {
          setErrorMessage(data.error);
        }
      });
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
          <FormErrorAlert message={errorMessage} />
          <Button type="submit" disabled={isPending} className="w-full">
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
