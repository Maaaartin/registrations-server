import ErrorWrapper from '../components/ErrorWrapper';

export default function Custom404() {
  return <ErrorWrapper statusCode={404}>Stránka nebyla nalezena.</ErrorWrapper>;
}
