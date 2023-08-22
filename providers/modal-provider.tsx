"use client";

import { useEffect, useState } from "react";
import { StripeModal } from "@/components/stripeModal";

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
    </>
  );
};
