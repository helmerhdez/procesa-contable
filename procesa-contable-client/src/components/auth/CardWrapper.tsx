"use client";

import { ChildrenType } from "@/types/children-type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const CardWrapper = ({ children }: ChildrenType) => {
  return (
    <Card className="w-[430px] shadow-md p-4">
      <CardHeader className="pb-0 pt-2 mb-4 px-4 flex-col">
        <CardTitle className="font-extrabold text-large text-center">Benvenido a Procesa Contable</CardTitle>
        <CardDescription className="text-default-500 text-center">Inicia sesión para gestionar tus finanzas de manera eficiente.</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
