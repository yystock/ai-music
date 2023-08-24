"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserRequest } from "@prisma/client";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useContactModal } from "@/hooks/useContactModal";

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
      const router = useRouter();
      const contactModal = useContactModal();
      if (request.status === "completed" && request.to === "Web") {
        return (
          <Button onClick={() => router.push(`/yours/${request.id}`)} variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Go:</span>
            <Send className="h-4 w-4 text-green-400" />
          </Button>
        );
      }
      if (request.status === "failed" || request.status === "pending") {
        return (
          <Button onClick={() => contactModal.onOpen()} variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Report</span>
            <Send className="h-4 w-4 text-red-400" />
          </Button>
        );
      }
    },
  },
];
