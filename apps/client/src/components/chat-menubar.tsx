"use client"

import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AppMenubar() {
    const [position, setPosition] = React.useState("bottom")

    return (
        <div className="flex w-full justify-between">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select LLM models</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="model1">Model 1</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="model2">Model 2</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="model3">Model 3</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        //     </MenubarMenu>
        // </Menubar>
    )
}