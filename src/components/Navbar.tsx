import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { account } from '@/lib/appwrite';

export default function Navbar() {
  const navigate = useNavigate();
  const { data } = useAuth();

  return (
    <nav className='flex items-center justify-between flex-wrap gap-4 py-4 px-12 border-b border-border'>
      <h1>Appwrite React</h1>

      <div>
        {data ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src='/default' alt={data.name} />
                <AvatarFallback>
                  {data.name.slice(0, 1)}
                  {data.name.slice(-1)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <Link to='/app'>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    if (!data) throw new Error('Not logged in');
                    await account.deleteSession(data.targets[0].$id);

                    toast.success('Logged out!');
                    navigate({ to: '/login' });
                  } catch (error: any) {
                    toast.error(error.message);
                  }
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
