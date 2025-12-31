"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import Sidebar from "@/components/ui/Sidebar";

type SidebarLayoutContextValue = {
  sidebarCollapsed: boolean;
};

const SidebarLayoutContext = createContext<
  SidebarLayoutContextValue | undefined
>(undefined);

export function useSidebarLayout() {
  const context = useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error("useSidebarLayout must be used within LayoutClient");
  }
  return context;
}

export default function LayoutClient({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const contextValue = useMemo(
    () => ({ sidebarCollapsed }),
    [sidebarCollapsed]
  );

  return (
    <SidebarLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen flex bg-gray-100 relative">
        
        {/* ================= DESKTOP SIDEBAR ================= */}
        <div
          className={`
            hidden lg:block
            transition-all duration-300 ease-in-out
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

        {/* ================= MOBILE SIDEBAR ================= */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* sidebar */}
            <div className="relative w-64 h-full bg-white shadow-lg">
              <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                collapsed={false}
                onCollapseChange={setSidebarCollapsed}
              />
            </div>
          </div>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-white shadow"
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
