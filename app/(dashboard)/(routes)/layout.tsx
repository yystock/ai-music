import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkUser } from "@/lib/getRole";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await checkUser();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar role={role} />
      </div>
      <main className="md:pl-72 pb-10 min-h-screen bg-background">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
