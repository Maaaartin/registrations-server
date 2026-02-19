import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useRouter } from 'next/router';
import { getGridLocaleText } from '../content/localization';
import { vinValid } from '../content/data';
import { useLoading } from '../hooks/useLoading';

type Props = Omit<DataGridProps, 'columns'>;

export default function VehicleDataGrid(props: Props) {
  const router = useRouter();
  const { loading } = useLoading();
  return (
    <DataGrid
      showToolbar
      localeText={props.localeText || getGridLocaleText({})}
      rowSelection={false}
      loading={loading || props.loading}
      onRowClick={(params) => {
        router.push({ pathname: '/vehicle', query: { id: params.row.id } });
      }}
      sx={{
        '& .MuiDataGrid-row': {
          cursor: 'pointer'
        },
        width: '100%'
      }}
      columns={[
        {
          field: 'tovarni_znacka',
          headerName: 'Tovární značka',
          flex: 0.5,
          minWidth: 200,
          renderCell: (params) => params.row.tovarni_znacka,
          sortable: false,
          filterable: false
        },
        {
          field: 'typ',
          headerName: 'Typ',
          flex: 0.5,
          minWidth: 300,
          renderCell: (params) => params.row.obchodni_oznaceni,
          sortable: false,
          filterable: false
        },
        {
          field: 'vin',
          headerName: 'VIN',
          flex: 0.5,
          minWidth: 150,
          renderCell: (params) => {
            const vin = params.row.vin ?? '';
            const isValid = vinValid(vin);
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <span>{vin}</span>
                {!isValid && (
                  <WarningAmberRoundedIcon
                    fontSize="small"
                    sx={{ color: 'warning.main' }}
                  />
                )}
              </Box>
            );
          },
          sortable: false,
          filterable: false
        },
        {
          field: 'cislo_tp',
          headerName: 'Číslo TP',
          flex: 0.5,
          minWidth: 80,
          renderCell: (params) => params.row.cislo_tp,
          sortable: false,
          filterable: false
        },
        {
          field: 'cislo_orv',
          headerName: 'Číslo ORV',
          flex: 0.5,
          minWidth: 80,
          renderCell: (params) => params.row.cislo_orv,
          sortable: false,
          filterable: false
        }
      ]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          sx: { height: '100vh' },
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small'
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' }
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' }
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
                sx: { width: '100vh' }
              }
            }
          }
        },
        ...props.slotProps?.toolbar
      }}
      {...props}
    />
  );
}
