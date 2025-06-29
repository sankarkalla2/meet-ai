"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewAgentDialog from "./new-agent-dialog";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import { SearchFilter } from "./agent-search-filter";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useAgentFilters();
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My agents</h5>
          <Button
            className="flex items-center"
            onClick={() => setIsDialogOpen((open) => !open)}
          >
            <Plus />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <SearchFilter />
        </div>
      </div>
    </>
  );
};
