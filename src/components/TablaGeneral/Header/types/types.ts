/* eslint-disable @typescript-eslint/ban-types */
export interface Header_Table_Props {
  columns: any;
  set_global_filter: React.Dispatch<React.SetStateAction<any>>;
  global_filter: string;
  handle_export_csv: Function | any;
  handle_export_excel: Function | any;
  filters: any;
  set_filters: React.Dispatch<React.SetStateAction<any>>;
}