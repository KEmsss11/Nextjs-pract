import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { Mail, MapPin, Camera, Calendar } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ProfileForm } from "@/components/ProfileForm";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
          PhoneNumber: true,
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
       <SidebarTrigger />
       <div className="flex min-h-screen w-full">  
        <AppSidebar isAdmin={isAdmin} firstName={appUser?.firstName} lastName={appUser?.lastName} /> 
            

              <main className="min-w-0 flex-1 p-4 sm:p-6">
                <SidebarTrigger />
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
                      <ProfileForm
                        firstName={appUser?.firstName}
                        lastName={appUser?.lastName}
                        cityMunicipality={appUser?.cityMunicipality}
                        phoneNumber={appUser?.PhoneNumber}
                      />
                    </CardContent>
                    </Card>
              </main>
         </div> 
    </SidebarProvider>
    );
}
