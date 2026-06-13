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

  function menuLink(url: string, pageName: string) {
    const onPage = pathname === url;
    return (
      <Link href={url}>
        <button
          className={`text-xl transition-all cursor-pointer py-1 px-4 hover:bg-secondary hover:text-onSecondary active:bg-primary rounded-md ${onPage ? " bg-secondary text-onSecondary" : "font-regular"}`}
        >
          {pageName}
        </button>
      </Link>
    );
  }

  return (
    <div className="w-full items-center heading py-4 flex flex-row justify-between">
      <span className=" text-2xl lg:text-4xl text-darkText">
        Invoice Tracker
      </span>
      <span className="hidden md:flex flex-row gap-8">
        {menuLink("/", "dashboard")}
        {menuLink("/invoices", "invoices")}
        {menuLink("/clients", "clients")}
        {menuLink("/expenses", "expenses")}
      </span>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
