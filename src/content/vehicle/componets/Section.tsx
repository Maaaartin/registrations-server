import { PropsWithChildren } from 'react';
import StatCard from '../../../components/StatCard';
import { Collapse, Divider } from '@mui/material';
import { useRouter } from 'next/router';

export default function Section({
  label,
  children,
  openKey
}: PropsWithChildren<{
  label: string;
  openKey: string;
}>) {
  const router = useRouter();
  const open = openKey in router.query;

  const onToggle = () => {
    const updatedQuery = { ...router.query };
    if (openKey in updatedQuery) {
      delete updatedQuery[openKey];
    } else {
      updatedQuery[openKey] = '1';
    }
    return router.push({ query: updatedQuery }, undefined, {
      shallow: true
    });
  };
  return (
    <StatCard
      title={label}
      collapse={{
        open,
        onToggle
      }}
    >
      <Collapse
        in={open}
        timeout={0}
        unmountOnExit
        sx={{
          width: '100%',
          overflow: 'scroll'
        }}
      >
        <Divider />
        {children}
      </Collapse>
    </StatCard>
  );
}
