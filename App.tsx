import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { useState } from "react";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { ScreenStack } from "react-native-screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Auth from "./screens/Onboarding/Auth";
import AuthContext from "./context/AuthContext";
import { Reducer } from "react";
import Onboarding from "./screens/Onboarding/Onboarding";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

const Stack = createNativeStackNavigator();

interface PrevState {
  userToken: string | null
}

interface Action {
  type: 'SIGN_IN'
  token: string
}


export default function App() {

  const [state, dispatch] = React.useReducer<Reducer<PrevState, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
      }
    },
    {
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      userToken && dispatch({ type: 'SIGN_IN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        await SecureStore.setItemAsync('userToken', token);

        dispatch({ type: 'SIGN_IN', token });
      },
      // signOut: () => dispatch({ type: 'SIGN_OUT' }),
      // signUp: async (token: string) => {
      //   // In a production app, we need to send user data to server and get a token
      //   // We will also need to handle errors if sign up failed
      //   // After getting token, we need to persist the token using `SecureStore`
      //   // In the example, we'll use a dummy token

      //   dispatch({ type: 'SIGN_IN', token });
      // },
    }),
    []
  );

  
  const isSignedIn = true || !!state.userToken
  const doesUserHaveProfile = false;

  return (
    <NativeBaseProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={doesUserHaveProfile ? 'Home' : 'Onboarding'}>
            {
              isSignedIn ? (
                <>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Onboarding" component={Onboarding}/>
                </>
              ) : (
                <Stack.Screen name="Auth" component={Auth}/>
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

