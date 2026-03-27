"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import useRouteLoader from "@/hooks/useRouteLoader";

const ClientLayoutWrapper = ({ children }) => {
  useRouteLoader();
  const pathname = usePathname();

  const isLoginPage =
    pathname.includes("/template/") ||
    pathname.includes("/error") ||
    pathname.includes("/success");

  return (
    <>
      {!isLoginPage && <Navigation />}
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  );
};

export default ClientLayoutWrapper;
