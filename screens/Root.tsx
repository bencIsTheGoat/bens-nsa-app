import React from 'react';
import { extendTheme, Spinner } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import SignIn from './Onboarding/SignIn';
import Onboarding from './Onboarding/Onboarding';
import { useSafeSWR } from '../utils/safeSWR';
import { StackParamList } from '../types/navigation.types';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  const { data: user, isValidating } = useSafeSWR('user');

  if (isValidating) {
    return <Spinner size="lg" />;
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </>
      )}
    </Stack.Navigator>
  );
};
