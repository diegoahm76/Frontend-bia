/* eslint-disable @typescript-eslint/naming-convention */
export const formatNumber=(number:any)=> {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }