"use client"

import ChatCard from "@/components/chat-card"
import AppMenubar from "@/components/chat-menubar"
import { AppSidebar } from "@/components/chat-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
// import { , Send,  } from "lucide-react"
import "@/styles/globals.css"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { jwtDecode} from 'jwt-decode';
import { Button } from "@/components/ui/button"
import axios from "axios"

export default function Chat() {
  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Or get from cookies
      if (!token) {
        redirect("/login")
      }
    }, []);

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ user: number; message: string }[]>([])
  
  const sendMessage = async () => {
    if (!message.trim()) return // Don't send empty messages

    // Update local state with the new message
    setMessages(prevMessages => [
      ...prevMessages,
      { user: 1, message } // Assuming user 1 is sending the message
    ])

    setMessage("")

    // Send message to the API
    try {
      const response = await axios.post("http://localhost:8000/generate", {}, {params: {query: message}})

      if (response.status == 200) {
        // Reset the message input after sending
        setMessages(prevMessages => [
          ...prevMessages,
          { user: 0, message: response.data.response.choices[0].message.content } // Assuming user 1 is sending the message
        ])
        console.log(response)
      } else {
        // Handle error (optional)
        console.error("Error sending message")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <AppMenubar />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/50">
          <div className="max-h-[75vh] flex-1 rounded-xl bg-muted/50 overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatCard key={index} message={msg.message} user={msg.user}/>
            ))}
          </div>
          <div className="grid w-full gap-2">
            <Textarea placeholder="Type your message here." className="resize-none" value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>Send message</Button>
        </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
