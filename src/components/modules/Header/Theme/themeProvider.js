import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { default as defaultTheme } from './ThemeSwith';
import Header from '../index';


export default function ThemeProvider({ children, theme = {}, location }) {
  return (
    <div>
      <Header location={location} />
      <EmotionThemeProvider theme={{ ...defaultTheme, ...theme }}>{children}</EmotionThemeProvider>
    </div>
  );
}
