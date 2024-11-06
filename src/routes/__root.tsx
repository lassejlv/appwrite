import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import '../globals.css';
import Notfound from '@/components/Notfound';
import LoadingPage from '@/components/LoadingPage';
import Navbar from '@/components/Navbar';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: Notfound,
  pendingComponent: LoadingPage,
});

function RootComponent() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Toaster richColors />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}
