import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { account } from '@/lib/appwrite';
import Container from '@/components/Container';

export const searchSchema = z.object({
  userId: z.string(),
  secret: z.string(),
  expire: z.string(),
});

export const Route = createFileRoute('/app/verify')({
  validateSearch: searchSchema,
  loaderDeps: ({ search: data }) => ({ data }),
  loader: async ({ deps: { data } }) => {
    const { userId, secret, expire } = data;

    // Check if user is logged in
    const session = await account.get();
    if (!session) throw new Error('Not logged in');

    // Check if session id matches user id
    if (session.$id !== userId) throw new Error('Not your session');

    // Check if secret is not expired
    if (Date.now() > Number(expire)) throw new Error('Expired');

    await account.updateVerification(userId, secret);

    return { message: 'Verification successful' };
  },
  onError: () => {
    throw redirect({
      to: '/app',
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { message } = Route.useLoaderData();
  return <Container padding>{message}</Container>;
}
