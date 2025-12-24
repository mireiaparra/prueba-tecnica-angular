import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

// Palettes derived from project variables
const primary = {
  50: '#fff0f7',
  100: '#ffd6ee',
  200: '#ffadc6',
  300: '#ff85a0',
  400: '#ff5f8b',
  500: '#ff2f86', // base (from $color-primary)
  600: '#f04069', // $color-primary-600
  700: '#d0335b',
  800: '#b2264a',
  900: '#8f1938',
  950: '#661125'
};

const secondary = {
  50: '#f2f4f6',
  100: '#dfe5e8',
  200: '#cbd6da',
  300: '#b7c5cc',
  400: '#9faeb6',
  500: '#6c757d', // $color-secondary
  600: '#62686f',
  700: '#565b62',
  800: '#4a4f55',
  900: '#3d4246',
  950: '#2c2f31'
};

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary,
    secondary,
    surface: '#ffffff', // $color-surface
    border: '#dcdcdc', // $color-border
    background: '#f7f8fa', // $color-background
    success: '#28a745', // $color-success
    warning: '#ffc107', // $color-warning
    error: '#dc3545' // $color-error
  }
});

