import ChatCard from "@/components/chat-card"
import AppMenubar from "@/components/chat-menubar"
import { AppSidebar } from "@/components/chat-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import "@/styles/globals.css"

export default function Chat() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <AppMenubar />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <ChatCard message={"Hello world"} user={1}/>
          </div>
          <div className="h-fit flex rounded-xl bg-muted/50">
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
