  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  export function StyleColor(type: string) {
    switch (type) {
      case 'LI':
        return '#36A9E1';
      case 'AS':
        return '#91C02C';
      case 'AP':
        return '#4CAF50';
      default:
        return '#6bb22b';
    }
  }