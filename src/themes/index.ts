import {DefaultTheme} from 'react-native-paper';

const defaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(37,99,235)',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

export default defaultTheme;
