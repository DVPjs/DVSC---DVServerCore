"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { verifyPassword } from "@/lib/auth.ts";

const AUTH_KEY = "dvscore_auth_token";

interface AuthContextType {
  password: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [password, setPassword] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const storedPassword = localStorage.getItem(AUTH_KEY);
    if (storedPassword) {
      setPassword(storedPassword);
      setIsAuthenticated(true);
    } else {
      setShowAuthDialog(true);
    }
  }, []);

  const handleAuth = () => {
    // This is a client-side hint, actual verification is on the server.
    if (!inputPassword) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Password cannot be empty.",
      });
      return;
    }
    localStorage.setItem(AUTH_KEY, inputPassword);
    setPassword(inputPassword);
    setIsAuthenticated(true);
    setShowAuthDialog(false);
    toast({
        title: "Authenticated",
        description: "Access granted.",
      });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setPassword(null);
    setIsAuthenticated(false);
    setShowAuthDialog(true);
    toast({
      title: "Logged Out",
      description: "You have been logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ password, isAuthenticated, logout }}>
      {isAuthenticated ? (
        children
      ) : (
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <KeyRound className="h-6 w-6 text-primary" />
                Authentication Required
              </DialogTitle>
              <DialogDescription>
                Enter the webhook password to access the DVSCore panel. This is stored only in your browser.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                id="password"
                type="password"
                placeholder="Enter password..."
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAuth} className="w-full">
                Authenticate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
