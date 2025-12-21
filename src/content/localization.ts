import type { GridLocaleText } from '@mui/x-data-grid';
import type { PickersInputLocaleText } from '@mui/x-date-pickers';
import { MAX_COUNT } from './data';

type Params = { error?: boolean; pageSize?: number };
export const getGridLocaleText: (params: Params) => Partial<GridLocaleText> = ({
  error,
  pageSize
}) => {
  return {
    columnMenuHideColumn: 'Skrýt sloupec',
    columnMenuManageColumns: 'Přizpůsobit sloupce',
    paginationDisplayedRows: ({ estimated, from, to, count }) => {
      const page =
        pageSize && Number.isFinite(pageSize)
          ? Math.floor((from - 1) / pageSize) + 1
          : undefined;

      if (count === -1) {
        return page
          ? `Strana ${page}`
          : `Strana ${estimated ? estimated : '?'}`;
      }
      return `${from} - ${to} z ${count}${count === MAX_COUNT ? '+' : ''}`;
    },
    paginationRowsPerPage: 'Řádků na stránku',
    noResultsOverlayLabel: error
      ? 'Data se nepovedlo načíst, zkuste zúžit filtr'
      : 'Žádné výsledky',
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
};

export const datePickerLocaleText: PickersInputLocaleText = {
  clearButtonLabel: 'Reset'
};
