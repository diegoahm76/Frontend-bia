export const general_transform = {
    in: (state: any, key: string) => {
      if (key === 'auth') {
        return {
          ...state,
          auth: (Boolean(state.auth)) || {}
        };
      }else if (key === 'layout') {
        return {
          ...state,
          layout: (Boolean(state.layout)) || {}
        };
      }else if (key === 'organigram') {
        return {
          ...state,
          organigram: (Boolean(state.organigram)) || {}
        };
      }else if (key === 'ccd') {
        return {
          ...state,
          ccd: (Boolean(state.ccd)) || {}
        };
      }else if (key === 'series') {
        return {
          ...state,
          series: (Boolean(state.series)) || {}
        };
      }else if (key === 'subseries') {
        return {
          ...state,
          subseries: (Boolean(state.subseries)) || {}
        };
      }else if (key === 'assignments') {
        return {
          ...state,
          assignments: (Boolean(state.assignments)) || {}
        };
      }
      return state;
    },
    out: (state: any, key: string) => {
      if (key === 'auth') {
        return {
          ...state,
          auth: state.auth
        };
      } else if(key === 'layout'){
        return {
          ...state,
          layout: state.layout
        };
      }else if(key === 'organigram'){
        return {
          ...state,
          organigram: state.organigram
        };
      }      else if(key === 'ccd'){
        return {
          ...state,
          ccd: state.ccd
        };
      }      else if(key === 'series'){
        return {
          ...state,
          series: state.series
        };
      }      else if(key === 'subseries'){
        return {
          ...state,
          subseries: state.subseries
        };
      }else if(key === 'assignments'){
        return {
          ...state,
          subseries: state.subseries
        };
      }
      return state;
    },
  };
