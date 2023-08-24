"use client";

import { Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useContactModal } from "@/hooks/useContactModal";
import { ContactForm } from "./contact-form";

export const ContactModal = () => {
  const contactModal = useContactModal();

  return (
    <Dialog open={contactModal.isOpen} onOpenChange={contactModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Contact us
              <Badge variant="default" className="uppercase text-sm py-1">
                <Send className="rotate-12" />
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 font-medium">
            <ContactForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
