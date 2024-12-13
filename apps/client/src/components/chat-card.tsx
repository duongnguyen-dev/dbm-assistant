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
    <Card className={`w-fit max-w-full h-fit items-center ${user === 1 ? "ml-auto mr-0 " : "ml-0 mr-auto "}`}>
      <CardContent className="">
        <span>{message}</span>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}
