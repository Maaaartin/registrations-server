import { Tooltip } from '@mui/material';

export default function TextWithDescription({
  name,
  description
}: {
  name: string;
  description: string | undefined | null;
}) {
  if (description) {
    return (
      <Tooltip title={description}>
        <span style={{ whiteSpace: 'nowrap' }}>{name} *</span>
      </Tooltip>
    );
  }
  return name;
}
