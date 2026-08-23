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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
                      <FieldSet className="w-full max-w-sm">
                        <FieldLegend>Personal Information</FieldLegend>
                        <FieldDescription>
                          Update your personal details and profile information.
                        </FieldDescription>
                        <FieldGroup>
                         <div className="grid grid-cols-2 gap-10">
                          <Field>
                            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                            <Input id="firstName" type="text"  defaultValue={appUser?.firstName || ""}/>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                            <Input id="lastName" type="text"  defaultValue={appUser?.lastName || ""} />
                          </Field>
                          </div>
                          <div className="grid grid-cols-2 gap-10">
                            <Field>
                              <FieldLabel htmlFor="cityMunicipality">City/Municipality</FieldLabel>
                              <Input id="cityMunicipality" type="text"  defaultValue={cityName || ""} />
                            </Field>
                            <Field>
                              <FieldLabel htmlFor="PhoneNumber">Phone</FieldLabel>
                              <Input id="PhoneNumber" type="number"  defaultValue={appUser?.PhoneNumber || ""} />
                            </Field>
                          </div>
                        </FieldGroup>
                      </FieldSet>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button variant="outline" className="text-white hover:bg-black">Decline</Button>
                        <Button>Accept</Button>
                    </CardFooter>
                    </Card>
              </main>
         </div> 
    </SidebarProvider>
    );
}
