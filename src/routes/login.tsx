import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { account } from '@/lib/appwrite';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import Container from '@/components/Container';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: { email: string; password: string }) => {
      const { email, password } = data;
      return await account.createEmailPasswordSession(email, password);
    },
    onSuccess: (data) => {
      console.log(data);

      navigate({ to: '/app' });
      toast.success('Welcome back!');
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
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    login.mutate(data);
  };

  return (
    <Container padding>
      <form className='flex flex-col gap-5' onSubmit={submit}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' name='email' id='email' placeholder='Your email' />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input type='password' name='password' id='password' placeholder='Your password' />
        </div>

        <Button type='submit' variant='outline' disabled={login.isPending}>
          {login.isPending ? <Spinner /> : 'Login'}
        </Button>
      </form>
    </Container>
  );
}
