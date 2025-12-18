import { alpha, Theme } from '@mui/material/styles';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';
import {
  yearCalendarClasses,
  monthCalendarClasses,
  pickersDayClasses
} from '@mui/x-date-pickers';
import { menuItemClasses } from '@mui/material/MenuItem';
import { gray, brand } from '../themePrimitives';

export const datePickersCustomizations: PickerComponents<Theme> = {
  MuiPickerPopper: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginTop: 4,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px'
        }
      })
    }
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: { width: 30 },
      button: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: theme.palette.grey[500],
        padding: 0
      })
    }
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      switchViewButton: {
        padding: 0,
        border: 'black'
      }
    }
  },
  MuiMonthCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        [`&.${monthCalendarClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${monthCalendarClasses.selected}`]: { backgroundColor: gray[700] }
        }
      })
    }
  },
  MuiYearCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        height: 'fit-content',
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: { backgroundColor: gray[700] }
        }
      })
    }
  },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        [`&.${pickersDayClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[700] }
        }
      })
    }
  }
};
