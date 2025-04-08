import type { NextPageContext } from 'next';
import type { ErrorProps } from 'next/error';
import ErrorWrapper from '../components/ErrorWrapper';

export default function CustomError(props: ErrorProps) {
  return <ErrorWrapper {...props}>Něco se pokazilo.</ErrorWrapper>;
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};
