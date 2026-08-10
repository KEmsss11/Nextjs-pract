"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  ChevronsUpDown,
  LayoutDashboard,
  ScanSearch,
  History,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <h2 className="text-xl font-bold group-data-[state=collapsed]:hidden">
            ScanPDF
        </h2>
       </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
           <SidebarMenuButton render={<Link href="/dashboard" />}>
            <LayoutDashboard />
            <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/scan" />}>
            <ScanSearch />
            <span>PDF Scan</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
           <SidebarMenuButton render={<Link href="/history" />}>
            <History />
            <span>History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/20 p-2">
        <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="h-auto rounded-md p-2 hover:bg-white/10"
                  >
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    width={36}
                    height={36}
                    className="size-9 rounded-full object-cover"
                  />

                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                    <span className="truncate font-semibold">shadcn</span>
                    <span className="truncate text-xs text-white/70">
                      m@example.com
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4 group-data-[state=collapsed]:hidden" />
                  </SidebarMenuButton>
                }
              />

              <DropdownMenuContent side="top" align="end" className="w-56">
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <LogoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
