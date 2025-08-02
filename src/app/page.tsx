import { AuthProvider } from '@/components/auth-provider';
import { Dashboard } from '@/components/dashboard';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <AuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background">
        <div className="w-full max-w-7xl mx-auto">
          <header className="mb-8 flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">DVSCore</h1>
              <p className="text-muted-foreground">Secure Management Panel</p>
            </div>
          </header>
          <Dashboard />
        </div>
      </main>
    </AuthProvider>
  );
}
