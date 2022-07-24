import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppleAuthenticationCredential } from 'expo-apple-authentication';

export type StackParamList = {
  Home: {};
  Auth: {};
  SignIn: {};
  Onboarding: { credential: AppleAuthenticationCredential };
};

export type ScreenProps<T extends keyof StackParamList> = NativeStackScreenProps<StackParamList, T>;
