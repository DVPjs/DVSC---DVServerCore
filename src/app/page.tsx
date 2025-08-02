'use client';
import { useEffect, useState } from 'react';

type Status = 'ok' | 'MID' | 'bad' | 'FUCKED' | 'loading...';

function getStatus(ping: number | null): Status {
  if (ping === null) return 'loading...';
  if (ping < 100) return 'ok';
  if (ping < 250) return 'MID';
  if (ping < 1500) return 'bad';
  return 'FUCKED';
}

export default function Home() {
  const [ping, setPing] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>('loading...');

  useEffect(() => {
    const updatePing = () => {
      const randomPing = Math.floor(Math.random() * 2000);
      setPing(randomPing);
      setStatus(getStatus(randomPing));
    };

    updatePing();
    const interval = setInterval(updatePing, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>DVSC DVServerCores status is ({status})</h1>
      <p>ok is &lt; 100ms ~ MID is &lt; 250ms ~ bad is &lt; 1500ms ~ FUCKED is anything after</p>
      <br />
      <ul>
        <li>Status: {status.toUpperCase()}</li>
        <li>Ping: {ping !== null ? `${ping}ms` : '...'}</li>
      </ul>
    </main>
  );
}
