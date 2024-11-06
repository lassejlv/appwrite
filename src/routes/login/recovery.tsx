import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { searchSchema } from '../app/verify';
import { account } from '@/lib/appwrite';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import Container from '@/components/Container';

export const Route = createFileRoute('/login/recovery')({
  validateSearch: searchSchema,
  loaderDeps: ({ search: data }) => ({ data }),
  loader: async ({ deps: { data } }) => {
    const { userId, secret, expire } = data;

    return { userId, secret, expire };
  },
  onError: () => {
    throw redirect({
      to: '/login',
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { userId, secret, expire } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const update = useMutation({
    mutationKey: ['update'],
    mutationFn: async (data: { password: string; confirmPassword: string }) => {
      const { password, confirmPassword } = data;
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      return await account.updateRecovery(userId, secret, password);
    },
    onSuccess: () => {
      toast.success('Password updated!');
      navigate({ to: '/login' });
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    update.mutate(data);
  };

  return (
    <Container padding>
      <form className='flex flex-col gap-5' onSubmit={submit}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>New Password</Label>
          <Input type='password' name='password' id='password' placeholder='Your new password' />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input type='password' name='confirmPassword' id='confirmPassword' placeholder='Confirm your new password' />
        </div>

        <Button type='submit' variant='outline' disabled={update.isPending}>
          {update.isPending ? <Spinner /> : 'Update password'}
        </Button>
      </form>
    </Container>
  );
}
