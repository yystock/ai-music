"use client";

import { useEffect, useState } from "react";
import { StripeModal } from "@/components/stripeModal";
import { ContactModal } from "@/components/contactModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StripeModal />
      <ContactModal />
    </>
  );
};
