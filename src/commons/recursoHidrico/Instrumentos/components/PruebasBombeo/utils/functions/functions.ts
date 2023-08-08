

export const get_header_name = (code: string): any => {
    switch (code) {
      case 'ACC':
        return 'Abatimiento a Caudal Constante';
      case 'ACE':
        return 'Abatimiento a Caudal Escalonado';
      case 'RCE':
        return 'Recuperación a Caudal Escalonado';
      case 'RCC':
        return 'Recuperación a Caudal Constante';
      default:
        return '';
    }
  };
