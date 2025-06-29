"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft, PanelRight, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCommand from "./dashboard-command";

const DashbaordNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [command, setCommand] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommand((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <DashboardCommand open={command} setOpen={setCommand} />
      <nav className="flex px-4 items-center gap-3 py-3 border-b bg-background w-full">
        <Button variant={"outline"} className="size-9" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? <PanelLeft /> : <PanelRight />}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground"
          onClick={() => setCommand(true)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 gap-1 rounded items-center px-1.5 text-[10px] font-medium text-muted-foreground">
            <span>&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashbaordNavbar;
