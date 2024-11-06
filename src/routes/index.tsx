import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import Container from '@/components/Container';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container padding>
      <h1 className='text-3xl font-bold'>Welcome to Appwrite React!</h1>
      <p>A template for building React apps with users auth. Easy to use. Using Appwrite.</p>
      <p>
        More updates coming soon. If you want to contribute, feel free to open an issue or a pull request on{' '}
        <a href='https://github.com/lassejlv/appwrite' target='_blank' rel='noreferrer'>
          GitHub
        </a>
      </p>
    </Container>
  );
}
