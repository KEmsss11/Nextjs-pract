import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const appUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });
  const isAdmin = appUser?.role === "ADMIN";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar isAdmin={isAdmin} />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold">
            {isAdmin ? "Admin Dashboard" : "Dashboard"}
          </h1>
          <p className="mt-2">Welcome, {user.email}</p>

          {isAdmin && (
            <section className="mt-6 rounded-lg border p-4">
              <h2 className="text-xl font-semibold">Admin controls</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You have administrator access.
              </p>
            </section>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
