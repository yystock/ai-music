"use client";

import axios from "axios";
import { useState } from "react";
import { Gem, Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStripeModal } from "@/hooks/useStripeModal";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

export const StripeModal = () => {
  const stripeModal = useStripeModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stripe?q=${stripeModal.quantity}`);

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={stripeModal.isOpen} onOpenChange={stripeModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Purchase Credits
              <Badge variant="default" className="uppercase text-sm py-1">
                <Gem className="rotate-12" />
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 font-medium">
            <div>
              <p>Get 50 credits for $5</p>
            </div>

            <div className="flex items-center gap-5 justify-between my-6 text-foreground">
              <Label className="text-end">Quantity:</Label>
              <Input type="number" placeholder="1" className="w-1/5" onChange={(e) => stripeModal.setPrice(parseInt(e.target.value))} min={0} />
            </div>

            <div className="flex justify-between items-center gap-5  text-foreground">
              <Label>Price:</Label>
              <Input className="w-1/5" type="number" placeholder="5" value={(stripeModal.quantity * 5).toString()} readOnly={true} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full">
            Buy
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
