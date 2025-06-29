"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentGetOne } from "../../types";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "meetings",
    header: "Meetings",
    cell: ({ row }) => {
      return <div>5 meetings</div>;
    },
  },
];
