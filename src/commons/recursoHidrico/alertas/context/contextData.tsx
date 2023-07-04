/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { createContext } from 'react';

interface UserContext {
  mode: string;
  set_mode: (mode: string) => void;
}

export const DataContext = createContext<UserContext>({
  mode: '',
  set_mode: () => {},
});

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): any => {
  const [mode, set_mode] = React.useState('');
  const value = {
    mode,
    set_mode,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
