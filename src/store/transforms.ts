export const layout_transform = {
    in: (state: any, key: string) => {
      if (key === 'layout') {
        const { mod_dark, ...rest } = state;
        return rest;
      }
      return state;
    },
    out: (state: any, key: string) => {
      if (key === 'layout') {
        return { mod_dark: true, ...state };
      }
      return state;
    },
  };

  export const auth_transform = {
    in: (state: any, key: string) => {
      if (key === 'auth') {
        const { mod_dark, ...rest } = state;
        return rest;
      }
      return state;
    },
    out: (state: any, key: string) => {
      if (key === 'auth') {
        return { mod_dark: true, ...state };
      }
      return state;
    },
  };