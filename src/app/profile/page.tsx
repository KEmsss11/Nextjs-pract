import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button"

import {
  Mail,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
import { Badge, PlusIcon } from "lucide-react";

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
            

              <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Profile</h1>
                 <p className="mt-2">Edit your profile information here.</p>

                  <Card className="mt-6 w-full max-w-lg">
                    <CardHeader>
                        <div className="flex items-center justify-center">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className="grayscale"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                             <AvatarBadge>
                                <PlusIcon />
                            </AvatarBadge>
                        </Avatar>
                        <CardTitle className="text-lg font-semibold ml-4 w-full max-w-md">
                            {appUser?.firstName || "First Name"} {appUser?.lastName || "Last Name"}
                        </CardTitle>
                      <CardDescription className="inline-flex w-fit whitespace-nowrap rounded-full bg-gray-100 px-10 py-1">
                        Pro Member
                        </CardDescription>
                        </div>
                        <CardDescription className="text-sm">
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                <span>{appUser?.email}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{cityName}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span> Joined: {" "}
                                {appUser?.createdAt &&
                                    new Date(appUser.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            </div>
                        </CardDescription>
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