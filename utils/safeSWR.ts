import { AppleAuthenticationCredential } from 'expo-apple-authentication';
import useSWR, { useSWRConfig } from 'swr';
import { FullConfiguration } from 'swr/dist/types';

interface User {}

export interface SWRTypes {
  user: User;
  appleCredentials: AppleAuthenticationCredential;
}

export const useSafeSWR = <T extends keyof SWRTypes>(key: T) => {
  return useSWR<SWRTypes[T]>(key);
};

interface Cache {
  get<T extends keyof SWRTypes>(key: T): SWRTypes[T] | undefined;
  set<T extends keyof SWRTypes>(key: T, value: SWRTypes[T]): void;
  delete(key: keyof SWRTypes): void;
}

export class SafeMap extends Map implements Cache {}

interface SafeConfig extends FullConfiguration {
  cache: Cache;
}

export const useSafeSWRConfig = (): SafeConfig => {
  return useSWRConfig();
};
