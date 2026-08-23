import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";

export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }
 const appUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
          firstName: true,
          lastName: true,
          region: true,
          province: true,
          cityMunicipality: true,
          PhoneNumber: true,
          createdAt: true,
          email: true,
          role: true,
    }
  });
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar isAdmin={false} firstName={appUser?.firstName} lastName={appUser?.lastName} />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold">
            History
          </h1>
      <p>Your scanned PDF history will appear here.</p>
        </main>
      </div>
    </SidebarProvider>
  );
} 
