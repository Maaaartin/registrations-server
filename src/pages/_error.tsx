import type { NextPageContext } from 'next';
import type { ErrorProps } from 'next/error';

export default function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {statusCode} - Ups!
      </h1>
      <p style={{ color: 'gray' }}>
        {statusCode === 404 ? 'Stránka nebyla nalezena.' : 'Něco se pokazilo.'}
      </p>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};
