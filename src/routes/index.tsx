import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, data, error } = useAuth();

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error' + error.message;
  }

  if (!data) {
    return 'Not logged in';
  }

  return <>Hello, {data.email}</>;
}
