import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SWRConfig } from 'swr';
import { AppState, AppStateStatus } from 'react-native';
import NetInfo, { NetInfoChangeHandler } from '@react-native-community/netinfo';
import Root from './screens/Root';
import { SafeMap } from './utils/safeSWR';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export default function App() {
  // SWR Configs
  const swrValue = {
    fetcher: (resource: string, init?: RequestInit) => fetch(resource, init).then((res) => res.json()),
    initFocus: (callback: Function) => {
      let appState = AppState.currentState;

      const onAppStateChange = (nextAppState: AppStateStatus) => {
        /* If it's resuming from background or inactive mode to active one */
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          callback();
        }
        appState = nextAppState;
      };

      // Subscribe to the app state change events
      AppState.addEventListener('change', onAppStateChange);

      return () => {
        AppState.removeEventListener('change', onAppStateChange);
      };
    },
    initReconnect: async (callback: Function) => {
      let { isConnected } = await NetInfo.fetch();

      const onNetworkChange: NetInfoChangeHandler = ({ isConnected: nextIsConnected }) => {
        if (!isConnected && nextIsConnected) {
          callback();
        }
        isConnected = nextIsConnected;
      };

      const unsubscribe = NetInfo.addEventListener(onNetworkChange);

      return () => {
        unsubscribe();
      };
    },
    provider: () => new SafeMap(),
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* @ts-expect-error initReconnect async shit */}
      <SWRConfig value={swrValue}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </SWRConfig>
    </ApplicationProvider>
  );
}
