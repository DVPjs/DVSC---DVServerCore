"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

type LogEntry = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  status: number;
  ip: string;
  timestamp: string;
};

const mockLogs: LogEntry[] = [
  { method: 'GET', path: '/api/v1/users', status: 200, ip: '66.249.66.1', timestamp: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString() },
  { method: 'POST', path: '/api/v1/auth/login', status: 401, ip: '192.168.1.10', timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString() },
  { method: 'GET', path: '/_next/static/css/main.css', status: 200, ip: '108.162.216.23', timestamp: new Date(Date.now() - 10 * 60 * 1000).toLocaleTimeString() },
  { method: 'PUT', path: '/api/v1/posts/123', status: 200, ip: '74.125.214.113', timestamp: new Date(Date.now() - 15 * 60 * 1000).toLocaleTimeString() },
  { method: 'DELETE', path: '/api/v1/session', status: 403, ip: '216.58.194.174', timestamp: new Date(Date.now() - 30 * 60 * 1000).toLocaleTimeString() },
  { method: 'POST', path: '/api/v1/data/ingest', status: 500, ip: '172.217.16.142', timestamp: new Date(Date.now() - 45 * 60 * 1000).toLocaleTimeString() }
];

const getStatusVariant = (status: number): 'default' | 'destructive' | 'secondary' => {
  if (status >= 500) return 'destructive';
  if (status >= 400) return 'destructive';
  if (status >= 300) return 'secondary';
  return 'default';
};

const getMethodColor = (method: string) => {
    switch(method) {
        case 'GET': return 'text-green-400';
        case 'POST': return 'text-blue-400';
        case 'PUT': return 'text-yellow-400';
        case 'DELETE': return 'text-red-400';
        default: return 'text-gray-400';
    }
}

export function RequestLogs() {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    useEffect(() => {
        // This component uses mock data to simulate a live log feed.
        // In a real application, this would connect to a WebSocket or use polling.
        setLogs(mockLogs);
    }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Logs</CardTitle>
        <CardDescription>
          A representation of incoming requests logged by the middleware.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg w-full">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Path</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Timestamp</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {logs.map((log, index) => (
                <TableRow key={index}>
                    <TableCell><span className={`font-mono font-bold ${getMethodColor(log.method)}`}>{log.method}</span></TableCell>
                    <TableCell><span className="font-mono">{log.path}</span></TableCell>
                    <TableCell className="text-right">
                    <Badge variant={getStatusVariant(log.status)}>{log.status}</Badge>
                    </TableCell>
                    <TableCell><span className="font-mono">{log.ip}</span></TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
