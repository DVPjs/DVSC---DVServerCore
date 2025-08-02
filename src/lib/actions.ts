"use server";

import fs from "fs/promises";
import path from "path";
import { verifyPassword } from "./auth";

const DATA_DIR = path.join(process.cwd(), "data");

// Helper to ensure file operations are restricted to the DATA_DIR
function getSafeFilePath(filename: string): string | null {
  if (/[\\/]/.test(filename)) {
    // Disallow directory traversal characters
    return null;
  }
  const absolutePath = path.join(DATA_DIR, filename);
  if (!absolutePath.startsWith(DATA_DIR)) {
    // Final check to prevent any traversal tricks
    return null;
  }
  return absolutePath;
}

async function ensureDataDirExists() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function listFiles(
  password: string
): Promise<{ success: boolean; files?: string[]; error?: string }> {
  if (!verifyPassword(password)) {
    return { success: false, error: "Authentication failed." };
  }
  try {
    await ensureDataDirExists();
    const files = await fs.readdir(DATA_DIR);
    return { success: true, files };
  } catch (error) {
    console.error("Error listing files:", error);
    return { success: false, error: "Failed to list files." };
  }
}

export async function readFile(
  password: string,
  filename: string
): Promise<{ success: boolean; content?: string; error?: string }> {
  if (!verifyPassword(password)) {
    return { success: false, error: "Authentication failed." };
  }
  const safePath = getSafeFilePath(filename);
  if (!safePath) {
    return { success: false, error: "Invalid filename." };
  }
  try {
    const content = await fs.readFile(safePath, "utf-8");
    return { success: true, content };
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return { success: false, error: `File not found or unreadable.` };
  }
}

export async function writeFile(
  password: string,
  filename: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  if (!verifyPassword(password)) {
    return { success: false, error: "Authentication failed." };
  }
  const safePath = getSafeFilePath(filename);
  if (!safePath) {
    return { success: false, error: "Invalid filename." };
  }
  try {
    await ensureDataDirExists();
    await fs.writeFile(safePath, content, "utf-8");
    return { success: true };
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error);
    return { success: false, error: "Failed to write file." };
  }
}

export async function executeCommand(
  password: string,
  command: string
): Promise<{ success: boolean; output?: string; error?: string }> {
  if (!verifyPassword(password)) {
    return { success: false, error: "Authentication failed." };
  }

  const [cmd, ...args] = command.trim().split(" ");

  try {
    switch (cmd) {
      case "ls":
        const { files, error } = await listFiles(password);
        return error
          ? { success: false, error }
          : { success: true, output: files?.join("\n") || "" };

      case "cat":
        if (args.length === 0) {
          return { success: false, error: "Usage: cat <filename>" };
        }
        const { content, error: readError } = await readFile(password, args[0]);
        return readError
          ? { success: false, error: readError }
          : { success: true, output: content };

      case "help":
        return {
          success: true,
          output: "Available commands:\n  ls - List files\n  cat <filename> - View file content\n  help - Show this help message",
        };
      
      case "clear":
        return { success: true, output: "clear_screen" };
        
      case "":
        return { success: true, output: "" };

      default:
        return { success: false, error: `Command not found: ${cmd}` };
    }
  } catch (error) {
    console.error(`Error executing command "${command}":`, error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
