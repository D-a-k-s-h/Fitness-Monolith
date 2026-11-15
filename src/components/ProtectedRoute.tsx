"use client";

import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { token, authInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authInitialized && !token) {
      router.replace("/auth");
    }
  }, [authInitialized, token, router]);

  return <>{children}</>;
}
