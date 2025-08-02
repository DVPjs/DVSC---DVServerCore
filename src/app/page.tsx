'use client';
import { useEffect, useState } from 'react';

type Status = 'ok' | 'MID' | 'bad' | 'FUCKED' | 'loading...';

function getStatus(ping: number | null): Status {
  if (ping === null) return 'loading...';
  if (ping <= 5) return 'ok';
  if (ping <= 20) return 'MID';
  if (ping <= 100) return 'bad';
  return 'FUCKED';
}

export default function Home() {
  const [ping, setPing] = useState<number | null>(null);

  useEffect(() => {
    // Simulate a ping check that updates every 3 seconds
    const interval = setInterval(() => {
      const randomPing = Math.floor(Math.random() * 1100);
      setPing(randomPing);
    }, 3000);

    // Initial ping
    setPing(Math.floor(Math.random() * 1100));

    return () => clearInterval(interval);
  }, []);

  const status = getStatus(ping);

  return (
    <main>
      <h1>DVSC DVServerCores status is ({status})</h1>
      <ul>
        <li>Status: {status.toUpperCase()}</li>
        <li>Ping: {ping !== null ? `${ping}ms` : '...'}</li>
      </ul>
    </main>
  );
}
