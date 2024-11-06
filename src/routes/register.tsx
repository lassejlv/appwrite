import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import Container from '@/components/Container';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { account, ID } from '@/lib/appwrite';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const { name, email, password } = data;
      await account.create(ID.unique(), email, password, name);
      return await account.createEmailPasswordSession(email, password);
    },
    onSuccess: (data) => {
      console.log(data);

      navigate({ to: '/login' });
      toast.success('Account created!');
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
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    register.mutate(data);
  };

  return (
    <Container padding>
      <form className='flex flex-col gap-5' onSubmit={submit}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input type='text' name='name' id='name' placeholder='Your name' />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' name='email' id='email' placeholder='Your email' />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input type='password' name='password' id='password' placeholder='Your password' />
        </div>

        <Button type='submit' variant='outline' disabled={register.isPending}>
          {register.isPending ? <Spinner /> : 'Register'}
        </Button>
      </form>
    </Container>
  );
}
