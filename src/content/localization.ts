import type { GridLocaleText } from '@mui/x-data-grid';
import type { PickersInputLocaleText } from '@mui/x-date-pickers';
import type { DateTime } from 'luxon';
import { MAX_COUNT } from './data';

export const gridLocaleText: Partial<GridLocaleText> = {
  columnMenuHideColumn: 'Skrýt sloupec',
  columnMenuManageColumns: 'Přizpůsobit sloupce',
  MuiTablePagination: {
    labelDisplayedRows: ({ page, from, to, count }) => {
      if (count === -1) {
        return `Strana ${page + 1}`;
      }
      return `${from} - ${to} z ${count}${count === MAX_COUNT ? '+' : ''}`;
    },
    labelRowsPerPage: 'Řádků na stránku'
  },
  noResultsOverlayLabel: 'Žádné výsledky',
  columnMenuSortAsc: 'Seřadit vzestupně',
  columnMenuSortDesc: 'Seřadit sestupně',
  filterPanelColumns: 'Sloupec',
  filterPanelInputLabel: 'Hodnota',
  filterPanelInputPlaceholder: '',
  filterOperatorContains: 'Obsahuje',
  filterOperatorDoesNotContain: 'Neobsahuje',
  filterOperatorEquals: 'Rovná se',
  filterOperatorDoesNotEqual: 'Nerovná se',
  filterOperatorStartsWith: 'Začíná textem',
  filterOperatorEndsWith: 'Končí textem',
  filterOperatorIsEmpty: 'Je prázdné',
  filterOperatorIsNotEmpty: 'Není prázdné',
  filterOperatorIsAnyOf: 'Je jedno z',
  noRowsLabel: 'Žádná data'
};

export const datePickerLocaleText: PickersInputLocaleText = {
  clearButtonLabel: 'Reset'
};
