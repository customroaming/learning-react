"use client";
import { Menu } from "@deemlol/next-icons";
import { useState } from "react";
import Sidebar from "./sidebar";
import { X } from "@deemlol/next-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const globalPageName = pathname.slice(1);

  function menuLink(url: string, pageName: string) {
    const onPage = pathname === url;
    return (
      <Link href={url}>
        <button
          className={`text-xl transition-all text-onSecondary cursor-pointer leading-4 pb-3 pt-2 px-6 hover:bg-secondary hover:text-onSecondary active:bg-primary rounded-full ${onPage ? " bg-secondary" : ""}`}
        >
          {pageName}
        </button>
      </Link>
    );
  }

  return (
    <div className="w-full bg-surfaceContainer items-center heading p-4 flex flex-row justify-between">
      <Link href="/dashboard">
        <span className=" text-3xl lg:text-4xl text-darkText">
          {globalPageName}
        </span>
      </Link>
      <span className="hidden md:flex flex-row gap-8">
        {menuLink("/", "dashboard")}
        {menuLink("/invoices", "invoices")}
        {menuLink("/clients", "clients")}
        {menuLink("/expenses", "expenses")}
      </span>
      <div className="hidden md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
