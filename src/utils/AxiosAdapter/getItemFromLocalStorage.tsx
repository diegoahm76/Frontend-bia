export const get_item = (key: string): any => {
  return sessionStorage.getItem(key) ?? '{}';
};