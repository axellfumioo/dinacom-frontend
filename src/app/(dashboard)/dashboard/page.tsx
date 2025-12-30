"use client";

import { useSidebarLayout } from '@/components/ui/LayoutClient';
import React, { useMemo } from 'react'

export default function DashboardPage() {
    const { sidebarCollapsed } = useSidebarLayout();
    const containerWidth = useMemo(
        () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
        [sidebarCollapsed]
    );


  return (
    <div className={`${containerWidth} mx-auto`}>
        DashboardPage
    </div>
  )
}
