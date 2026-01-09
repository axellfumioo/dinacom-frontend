"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import Sidebar from "@/components/ui/Sidebar";
import { Toaster } from "react-hot-toast";

type SidebarLayoutContextValue = {
  sidebarCollapsed: boolean;
};

const SidebarLayoutContext = createContext<
  SidebarLayoutContextValue | undefined
>(undefined);

export function useSidebarLayout() {
  const ctx = useContext(SidebarLayoutContext);
  if (!ctx) throw new Error("useSidebarLayout must be used within LayoutClient");
  return ctx;
}

export default function LayoutClient({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const value = useMemo(() => ({ sidebarCollapsed }), [sidebarCollapsed]);

  return (
    <SidebarLayoutContext.Provider value={value}>
      <Toaster />
      <div className="min-h-screen flex bg-gray-100 relative">

        {/* ===== DESKTOP SIDEBAR ===== */}
        <div
          className={`
            hidden lg:block
            transition-all duration-300
            ${sidebarCollapsed ? "w-20" : "w-64"}
          `}
        >
          <Sidebar
            open={false}
            setOpen={setSidebarOpen}
            collapsed={sidebarCollapsed}
            onCollapseChange={setSidebarCollapsed}
          />
        </div>

        {/* ===== MOBILE SIDEBAR ===== */}
        <div
          className={`
            fixed inset-0 z-40 lg:hidden
            transition-opacity
            ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <div
            className={`
              absolute left-0 top-0 h-full w-64 bg-white
              transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <Sidebar
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              collapsed={false}
              onCollapseChange={setSidebarCollapsed}
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="lg:hidden p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-white rounded-md shadow"
            >
              ☰
            </button>
          </div>

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarLayoutContext.Provider>
  );
}
