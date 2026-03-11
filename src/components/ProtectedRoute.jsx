"use client";

import { useRouter, usePathname } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  // GlobalContext is missing in the source codebase.
  // Custom logic for briefSubmitted would go here.
  const briefSubmitted = true;
  const router = useRouter();
  const pathname = usePathname();

  if (!briefSubmitted) {
    // router.push("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
