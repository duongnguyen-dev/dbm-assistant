import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

type ChatCardProps = {
    message: String,
    user: Number
}

export default function ChatCard({message, user }: ChatCardProps) {
  return (
    <Card className={`w-fit mt-3 max-w-full h-fit items-center p-4 ${user === 1 ? "ml-auto mr-0 bg-sidebar" : "ml-0 mr-auto"}`}>
      <CardContent className={`p-0`}>
        <span>{message}</span>
      </CardContent>
      {user === 0 ?
        <div className="flex w-fit">
          <Button variant="ghost" size="icon"><ThumbsUp /></Button>
          <Button variant="ghost" size="icon"><ThumbsDown /></Button>
          <Button variant="ghost" size="icon"><RefreshCw /></Button>
        </div> :
        <div></div>
      } 
    </Card>
  )
}
