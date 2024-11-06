import React from 'react';

export default function Container({ padding, children }: { padding?: boolean; children: React.ReactNode }) {
  return <div className={`container mx-auto ${padding ? ' py-5' : ''}`}>{children}</div>;
}
