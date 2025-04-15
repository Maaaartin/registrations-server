import { PropsWithChildren, useState } from 'react';
import StatCard from '../../../components/StatCard';
import { Collapse, Divider } from '@mui/material';

export default function Section({
  label,
  children
}: PropsWithChildren<{
  label: string;
}>) {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);
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
