"use client";
// import { useEffect, useState } from "react";
import { useStripeModal } from "@/hooks/useStripeModal";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Gem } from "lucide-react";

export const CreditsCounter = ({ credits = 0 }: { credits: number }) => {
  //   const [mounted, setMounted] = useState(false);
  const stripeModal = useStripeModal();

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   if (!mounted) {
  //     return null;
  //   }

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button className="text-purple-600 bg-transparent">
          {credits}
          <Gem />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {" "}
          You have left {credits} credits. <Button onClick={() => stripeModal.onOpen()}>Buy more</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
