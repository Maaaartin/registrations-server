import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { gridLocaleText } from '../util/localization';

type Props = Omit<DataGridProps, 'columns'>;

export default function VehicleDataGrid(props: Props) {
  const router = useRouter();
  return (
    <DataGrid
      localeText={gridLocaleText}
      rowSelection={false}
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
          renderCell: (params) => params.row.typ,
          sortable: false,
          filterable: false
        },
        {
          field: 'vin',
          headerName: 'VIN',
          flex: 0.5,
          minWidth: 150,
          renderCell: (params) => params.row.vin,
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
