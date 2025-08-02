"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./auth-provider";
import { listFiles, readFile, writeFile } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { File, RefreshCw, Save, FolderOpen } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function FileManager() {
  const { password } = useAuth();
  const { toast } = useToast();

  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleListFiles = async () => {
    if (!password) return;
    setIsLoadingFiles(true);
    const result = await listFiles(password);
    if (result.success && result.files) {
      setFiles(result.files);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setIsLoadingFiles(false);
  };

  useEffect(() => {
    handleListFiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const handleSelectFile = async (filename: string) => {
    if (!password) return;
    setSelectedFile(filename);
    setIsLoadingContent(true);
    setContent("");
    const result = await readFile(password, filename);
    if (result.success && typeof result.content === 'string') {
      setContent(result.content);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setIsLoadingContent(false);
  };

  const handleSaveFile = async () => {
    if (!password || !selectedFile) return;
    setIsSaving(true);
    const result = await writeFile(password, selectedFile, content);
    if (result.success) {
      toast({ title: "Success", description: `File "${selectedFile}" saved.` });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
        <CardDescription>
          View and edit files in the secure data directory.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><FolderOpen className="w-5 h-5" /> Files</h3>
            <Button variant="ghost" size="icon" onClick={handleListFiles} disabled={isLoadingFiles}>
              <RefreshCw className={`h-4 w-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <div className="space-y-2 pr-2 max-h-96 overflow-y-auto">
            {isLoadingFiles ? (
                Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
            ) : files.length > 0 ? (
              files.map((file) => (
                <Button
                  key={file}
                  variant={selectedFile === file ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleSelectFile(file)}
                >
                  <File className="mr-2 h-4 w-4" />
                  {file}
                </Button>
              ))
            ) : (
                <p className="text-sm text-muted-foreground p-4 text-center">No files found.</p>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
           {selectedFile ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-semibold truncate pr-4">{selectedFile}</h3>
                 <Button onClick={handleSaveFile} disabled={isSaving || isLoadingContent}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Content"}
                </Button>
              </div>
              {isLoadingContent ? (
                <Skeleton className="h-96 w-full" />
              ) : (
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="File content..."
                    className="h-96 font-mono text-sm"
                />
              )}
            </div>
           ) : (
            <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed border-border">
                <p className="text-muted-foreground">Select a file to view its content</p>
            </div>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
