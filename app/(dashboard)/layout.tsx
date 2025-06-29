import { SidebarProvider } from "@/components/ui/sidebar";
import DashbaordNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import React from "react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full min-h-[80vh]">
        <Toaster />
        <DashbaordNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
