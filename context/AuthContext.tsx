import * as React from 'react';

interface AuthContext {
  signIn(token: string): Promise<void>
  // signOut(): void
  // signUp(token: string): Promise<void>
}

export default React.createContext<AuthContext>({
  signIn: (token: string) => Promise.resolve(),
  // signOut: () => {},
  // signUp: (token: string) => Promise.resolve(),

});