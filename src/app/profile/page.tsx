import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button"


import { Mail, MapPin, Camera, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default async function ProfilePage() {
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
        createdAt: true,
        email: true,
        role: true,
    }
  });
  let cityName = appUser?.cityMunicipality ?? "";

if (appUser?.cityMunicipality) {
  const response = await fetch(
    `https://psgc.gitlab.io/api/cities-municipalities/${appUser.cityMunicipality}/`,
    { cache: "no-store" }
  );

  if (response.ok) {
    const city = await response.json();
    cityName = city.name;
  }
}

const isAdmin = appUser?.role === "ADMIN";
    return (
    <SidebarProvider>
       <div className="flex min-h-screen w-full">  
        <AppSidebar isAdmin={isAdmin} /> 
            

              <main className="min-w-0 flex-1 p-4 sm:p-6">
                <h1 className="text-3xl font-bold">Profile</h1>
                 <p className="mt-2">Edit your profile information here.</p>

                  <Card className="mt-6 w-full">
                    <CardHeader className="p-4 sm:p-6">
                        <div className="flex w-full items-start gap-4 sm:gap-6">
                            <Avatar className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className="grayscale"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                             <AvatarBadge className="!size-6">
                                <Camera className="!size-6" />
                            </AvatarBadge>
                        </Avatar>
                        <div className="min-w-0 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <CardTitle className="text-xl font-semibold sm:text-2xl">
                              {appUser?.firstName || "First Name"} {appUser?.lastName || "Last Name"}
                            </CardTitle>
                            <span className="inline-flex items-center rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                              Pro Member
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground sm:text-base">
                            {appUser?.role === "ADMIN" ? "Administrator" : "Member"}
                          </p>
                          <div className="flex flex-col gap-2 pt-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
                            <div className="flex min-w-0 items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span className="truncate">{appUser?.email}</span>
                            </div>

                            <div className="flex min-w-0 items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span className="truncate">{cityName || "Location not set"}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Joined: {appUser?.createdAt
                                  ? new Date(appUser.createdAt).toLocaleDateString()
                                  : "-"}
                                </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing)">
                        <div className="-mx-(--card-spacing) max-h-48 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
                        <p>
                            These terms govern your use of the workspace, including access to
                            shared documents, project files, and collaboration tools.
                        </p>
                        <p>
                            You are responsible for the content you upload and for ensuring that
                            your team has the appropriate permissions to view or edit it.
                        </p>
                        <p>
                            We may update features or limits as the service evolves. When those
                            changes materially affect your workflow, we will notify your
                            workspace administrators.
                        </p>
                        <p>
                            By continuing, you agree to keep your account credentials secure and
                            to follow your organization&apos;s acceptable use policies.
                        </p>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button variant="outline">Decline</Button>
                        <Button>Accept</Button>
                    </CardFooter>
                    </Card>
              </main>
         </div> 
    </SidebarProvider>
    );
}
