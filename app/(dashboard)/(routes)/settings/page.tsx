import { CreditsCounter } from "@/components/creditsCounter";
import { FreeCounter } from "@/components/free-counter";
import { Heading } from "@/components/heading";
import { getUser } from "@/lib/user";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MusiCat | Settings",
  description: "Your Personalized AI Music Journey",
};

const SettingsPage = async () => {
  const user = await getUser();
  if (!user) return null;

  return (
    <div>
      <Heading title="Settings" description="Manage account settings." name="settings" />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {user.role === "paid"
            ? `You are currently a Paid Member.`
            : user.role === "admin"
            ? "You are the admin!"
            : "You are currently on a free plan."}
        </div>
        <div>
          {user?.role !== "user" ? (
            <div className="flex gap-5 items-center">
              <p>You currently have </p>
              <CreditsCounter credits={user.credits} />
            </div>
          ) : (
            <FreeCounter credits={user.credits} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
