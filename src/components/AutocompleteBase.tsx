import React from 'react';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

export default function AutocompleteBase(
  props: Omit<AutocompleteProps<string, false, false, true>, 'renderInput'> & {
    label: string;
  }
) {
  return (
    <Autocomplete
      freeSolo
      disablePortal
      sx={{ width: 300, height: 'min-content' }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      {...props}
    />
  );
}
