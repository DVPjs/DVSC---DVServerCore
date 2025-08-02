"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./auth-provider";
import { executeCommand } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";

interface HistoryItem {
  type: "command" | "output" | "error";
  text: string;
}

export function Terminal() {
  const { password } = useAuth();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "DVSCore Secure Terminal. Type 'help' for commands." },
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || isExecuting || !input.trim()) return;

    const command = input;
    setInput("");
    setHistory((prev) => [...prev, { type: "command", text: command }]);
    setIsExecuting(true);

    const result = await executeCommand(password, command);

    if (result.success) {
      if(result.output === "clear_screen") {
        setHistory([]);
      } else if (result.output) {
        setHistory((prev) => [...prev, { type: "output", text: result.output! }]);
      }
    } else {
      setHistory((prev) => [...prev, { type: "error", text: result.error! }]);
      toast({ variant: "destructive", title: "Command Error", description: result.error });
    }
    setIsExecuting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure Terminal</CardTitle>
        <CardDescription>
          Execute a limited set of commands for server management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm flex flex-col">
          <div className="flex-grow">
            {history.map((item, index) => (
              <div key={index} className="whitespace-pre-wrap break-words">
                {item.type === "command" && (
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                )}
                {item.type === "output" && (
                  <p className="text-gray-300">{item.text}</p>
                )}
                {item.type === "error" && (
                  <p className="text-red-500">Error: {item.text}</p>
                )}
              </div>
            ))}
            <div ref={endOfHistoryRef} />
          </div>
          <form onSubmit={handleCommand} className="flex items-center mt-4">
            <TerminalIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command..."
              className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
              autoFocus
              disabled={isExecuting}
            />
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
