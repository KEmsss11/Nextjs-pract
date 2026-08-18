import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
      <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2">
            Welcome, {user.email}
          </p>
        </main>
      </div>
    </SidebarProvider>
  );
}