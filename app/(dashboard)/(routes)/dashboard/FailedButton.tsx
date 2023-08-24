"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useContactModal } from "@/hooks/useContactModal";
export default function FailedButton({ requestId }: { requestId: string }) {
  const contactModal = useContactModal();
  return (
    <Button onClick={() => contactModal.onOpen()} variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Report</span>
      <Send className="h-4 w-4 text-red-400" />
    </Button>
  );
}
