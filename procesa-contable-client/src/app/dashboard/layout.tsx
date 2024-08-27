"use client";

import NavMenu from "@/components/header/NavMenu";
import SideBar from "@/components/side-bar/SideBar";
import { ChildrenType } from "@/types/children-type";

export default function DashboardLayout({ children }: ChildrenType) {
  return (
    <section className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:max-w-56 bg-white dark:bg-neutral-900">
        <SideBar />
      </div>
      <section className="flex-grow md:overflow-y-auto">
        <NavMenu className="flex justify-between items-center p-4 border-b" />
        <section>{children}</section>
      </section>
    </section>
  );
}
