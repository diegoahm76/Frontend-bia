// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function StyleColor(type: string) {
  console.log()
  switch (type) {
    case 'AS':
      return 'green'; // Bright Orange
    case 'AP':
      return 'orange'; // Bright Yellow
    case 'SUB':
      return '#C70039'; // Bright Red
    /*      case 'AP':
        return 'blue'; // Dark Red*/
    default:
      return '#581845'; // Purple
  }
}
