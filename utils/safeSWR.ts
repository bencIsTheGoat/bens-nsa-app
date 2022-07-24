import { AppleAuthenticationCredential } from 'expo-apple-authentication';
import useSWR, { useSWRConfig } from 'swr';
import { BareFetcher, FullConfiguration, PublicConfiguration } from 'swr/dist/types';

interface User {}

export interface SWRTypes {
  user: User;
}

export const useSafeSWR = <T extends keyof SWRTypes>(
  key: T,
  options?: Partial<PublicConfiguration<SWRTypes[T], any, BareFetcher<SWRTypes[T]>>>
) => {
  return useSWR<SWRTypes[T]>(key, options);
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
