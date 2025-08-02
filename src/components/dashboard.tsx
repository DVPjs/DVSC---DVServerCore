"use client";

import { HardDrive, History, TerminalSquare, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestLogs } from "./request-logs";
import { FileManager } from "./file-manager";
import { Terminal } from "./terminal";
import { Button } from "./ui/button";
import { useAuth } from "./auth-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Dashboard() {
  const { logout } = useAuth();
  return (
    <div className="relative">
      <TooltipProvider>
        <div className="absolute top-0 right-0 -mt-14">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log Out</p>
              </TooltipContent>
            </Tooltip>
        </div>
      </TooltipProvider>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:w-auto sm:grid-cols-3">
          <TabsTrigger value="logs">
            <History className="mr-2 h-4 w-4" />
            Request Logs
          </TabsTrigger>
          <TabsTrigger value="files">
            <HardDrive className="mr-2 h-4 w-4" />
            File Management
          </TabsTrigger>
          <TabsTrigger value="terminal">
            <TerminalSquare className="mr-2 h-4 w-4" />
            Terminal
          </TabsTrigger>
        </TabsList>
        <TabsContent value="logs">
          <RequestLogs />
        </TabsContent>
        <TabsContent value="files">
          <FileManager />
        </TabsContent>
        <TabsContent value="terminal">
          <Terminal />
        </TabsContent>
      </Tabs>
    </div>
  );
}
