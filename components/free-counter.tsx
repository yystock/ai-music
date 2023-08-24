"use client";

import { Zap } from "lucide-react";
// import { useEffect, useState } from "react";
import { MAX_FREE_COUNTS } from "@/lib/config";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStripeModal } from "@/hooks/useStripeModal";
import { Progress } from "./ui/progress";
export const FreeCounter = ({ credits = 0 }: { credits: number }) => {
  // const [mounted, setMounted] = useState(false);
  const stripeModal = useStripeModal();

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm mb-4 space-y-2">
            <p>
              {credits} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={(credits / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button onClick={stripeModal.onOpen} variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
