import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { checkUser } from "@/lib/getRole";

const Navbar = async () => {
  //   const apiLimitCount = await getApiLimitCount();
  const role = await checkUser();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar role={role} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
