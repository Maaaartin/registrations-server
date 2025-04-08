import type { ErrorProps } from 'next/error';
import { PropsWithChildren } from 'react';

export default function ErrorWrapper({
  statusCode,
  children
}: ErrorProps & PropsWithChildren) {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {statusCode} - Ups!
      </h1>
      <p style={{ color: 'gray' }}>{children}</p>
    </div>
  );
}
