"use client";

import CommonSidebar from "@/components/CommonSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <CommonSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main
        className={`min-w-0 flex-1 transition-[margin-left] duration-300 md:ml-15 ${
          sidebarOpen ? "md:ml-75" : ""
        }`}
      >
        {children}
      </main>
    </ProtectedRoute>
  );
}
