import * as React from 'react';
import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 18 }: { size?: number }) {
  return (
    <>
      <Loader2 className='animate-spin' size={size} />
    </>
  );
}
