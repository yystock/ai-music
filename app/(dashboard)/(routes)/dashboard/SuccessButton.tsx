"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
export default function SuccessButton({ requestId }: { requestId: string }) {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/yours/${requestId}`)} variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Go:</span>
      <Send className="h-4 w-4 text-green-400" />
    </Button>
  );
}
