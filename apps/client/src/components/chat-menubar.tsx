"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import api from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";


export default function AppMenubar() {
    const { toast } = useToast()
    const [position, setPosition] = React.useState("bottom")
    const [embedModels, setEmbedModels] = React.useState<[]>([])

    const [userRole, setUserRole] = React.useState<string | null>("ADMIN");  // Stores the user's role
    const [formData, setFormData] = React.useState({
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        userId: Number,
        embedId: Number,
    });

    // Fetch the user's role from the backend API
    React.useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    return;
                }
                const response = await api.get("/users/user", {headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                }}) ;
                setUserRole(response.data.user["role"]);  // Set the role based on the response
                setFormData((prev) => ({ ...prev, userId: response.data.user["id"] }))
            } catch (error) {
                console.error("Error fetching user role:", error);
                // Handle the error (e.g., user not authenticated)
            }
        };
        fetchUserRole();
    }, []);

    React.useEffect(() => {
        const fetchEmbedModels = async () => {
            if (userRole === "ADMIN") {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    return;
                }
                const response = await api.get("/embed/fetchAll", {headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                }}) ;
                setEmbedModels(response.data.models)
            }
        }
        fetchEmbedModels()
    }, [])
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        const embedId = JSON.parse(value)["id"]
        setFormData((prev) => ({ ...prev, embedId: embedId }));
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post("/database/create", formData);
            toast({
                variant: "default",
                title: "Successfully Registered",
                // description: "Friday, February 10, 2023 at 5:57 P",
            });
        // Handle success (e.g., show a success message, close the dialog, etc.)
        } catch (error) {
        console.error("Error:", error);
        // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="flex w-full justify-between">
            <div className="flex w-fit gap-3">
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
                {
                    userRole === "ADMIN" && 
                    <Dialog>
                        <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Database Register</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Register your Database</DialogTitle>
                                <DialogDescription>
                                    This will create a vector database and your database metadata will not be stored in anywhere.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="host" className="text-right">
                                        Host
                                    </Label>
                                    <Input id="host" className="col-span-3" onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="port" className="text-right">
                                        Port
                                    </Label>
                                    <Input id="port" className="col-span-3" onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="database" className="text-right">
                                        Database
                                    </Label>
                                    <Input id="database" className="col-span-3" onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username" className="col-span-3" onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Password
                                    </Label>
                                    <Input id="password" className="col-span-3" onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="embed" className="text-right">
                                        Embedding Model
                                    </Label>
                                    <div id="embed" className="w-fit">
                                        <Select onValueChange={handleSelectChange}>
                                            <SelectTrigger className="w-[280px]">
                                                <SelectValue placeholder="Select an Embedding model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Embedding Models</SelectLabel>
                                                    {embedModels ? embedModels.map((model) => (
                                                        <SelectItem key={model["id"]} value={JSON.stringify({ id: model["id"], name: model["name"] })}>
                                                            {model["name"]}
                                                        </SelectItem>
                                                    )): null}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>                           
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleSubmit}>Submit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                }
                
            </div>
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
        //     </MenubarMenu>
        // </Menubar>
    )
}