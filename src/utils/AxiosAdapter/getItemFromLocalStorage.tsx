export const get_item = (key: string): any => {
  return localStorage.getItem(key) ?? '{}';
};