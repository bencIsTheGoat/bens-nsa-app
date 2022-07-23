import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  Home: {};
  Auth: {};
  SignIn: {};
  Onboarding: {};
};

export type ScreenProps<T extends keyof StackParamList> = NativeStackScreenProps<StackParamList, T>;
