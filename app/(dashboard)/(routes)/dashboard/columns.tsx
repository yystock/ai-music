"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserRequest } from "@prisma/client";
import SuccessButton from "./SuccessButton";
import FailedButton from "./FailedButton";

export const columns: ColumnDef<UserRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      if (request.status === "completed" && request.to === "Web") {
        return (
          <>
            <SuccessButton requestId={request.id} />
          </>
        );
      }
      if (request.status === "failed" || request.status === "pending") {
        return (
          <>
            <FailedButton requestId={request.id} />
          </>
        );
      } else {
        return null;
      }
    },
  },
];
