import * as React from "react";
import { SquarePen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchForm } from "@/components/search-form";
// import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Today",
      url: "#",
      items: [
        {
          title: "Chat Messages 1",
          url: "#",
        },
        {
          title: "Chat Messages 2",
          url: "#",
        },
      ],
    },
    {
      title: "Yesterday",
      url: "#",
      items: [
        {
          title: "Chat Messages 1",
          url: "#",
        },
        {
          title: "Chat Messages 2",
          url: "#",
          isActive: true,
        }
      ],
    },
    {
      title: "7 days ago",
      url: "#",
      items: [
        {
          title: "Chat Messages 1",
          url: "#",
        },
        {
          title: "Chat Messages 2",
          url: "#",
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="w-full flex justify-end items-center">
          <SearchForm />
          <Button variant="ghost" size="icon">
            <SquarePen />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
