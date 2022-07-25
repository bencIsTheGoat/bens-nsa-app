import React from 'react';
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

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  const { data: user } = useSafeSWR('user');

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
