"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import useRouteLoader from "@/hooks/useRouteLoader";

export default function MainLayout({ children }) {
  useRouteLoader();
  const pathname = usePathname();

  const isLoginPage =
    pathname.includes("/template/") ||
    pathname.includes("/error") ||
    pathname.includes("/success");

  return (
    <div className="app">
      <Header />
      {!isLoginPage && <Navigation />}

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
