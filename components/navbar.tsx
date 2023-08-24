import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { getUser } from "@/lib/user";
import { CreditsCounter } from "./creditsCounter";
import { ModeToggle } from "./mode-toggle";

const Navbar = async () => {
  const user = await getUser();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar role={user ? user.role : false} />
      <div className="flex w-full justify-end items-center gap-5 pr-2">
        {user && (
          <div className="flex gap-2 text-primary">
            {/* {user.credits}
            <Gem /> */}
            {user && <CreditsCounter credits={user.credits} />}
          </div>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
