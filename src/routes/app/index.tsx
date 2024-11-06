import * as React from 'react';
import Container from '@/components/Container';
import Spinner from '@/components/Spinner';
import { account } from '@/lib/appwrite';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MessageCircleWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/app/')({
  loader: async () => {
    const user = await account.get();
    const { sessions } = await account.listSessions();

    return { user, sessions };
  },
  onError: () => {
    throw redirect({
      to: '/login',
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user, sessions } = Route.useLoaderData();

  const sendVerificationEmail = useMutation({
    mutationKey: ['sendVerificationEmail'],
    mutationFn: async () => {
      return await account.createVerification(`${import.meta.env.VITE_APP_URL}/app/verify`);
    },
    onSuccess: () => {
      toast.success('Verification email sent!');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const deleteSession = useMutation({
    mutationKey: ['deleteSession'],
    mutationFn: async (data: { sessionId: string }) => {
      const { sessionId } = data;
      return await account.deleteSession(sessionId);
    },
    onSuccess: () => {
      toast.success('Session deleted!');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return (
    <Container padding>
      {!user.emailVerification && (
        <Alert variant='destructive'>
          <MessageCircleWarning className='h-4 w-4' />
          <AlertTitle>Your account is not verified!</AlertTitle>
          <AlertDescription>
            <Button disabled={sendVerificationEmail.isPending} onClick={() => sendVerificationEmail.mutate()}>
              {sendVerificationEmail.isPending ? <Spinner /> : 'Send verification email'}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <h1 className='text-3xl'>Hello, {user.name}!</h1>

      <div className='flex flex-col my-5'>
        <h1 className='text-xl'>Sessions</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Browser and device</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>IP</TableHead>
              <TableHead className='text-right'>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.$id}>
                <TableCell className='font-medium'>
                  {session.clientName} on {session.osName}
                </TableCell>
                <TableCell>{session.countryName}</TableCell>
                <TableCell>{session.ip}</TableCell>
                <TableCell className='text-right'>
                  <Button variant='destructive' size='sm' onClick={() => deleteSession.mutate({ sessionId: session.$id })} disabled={deleteSession.isPending}>
                    {deleteSession.isPending ? <Spinner /> : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
