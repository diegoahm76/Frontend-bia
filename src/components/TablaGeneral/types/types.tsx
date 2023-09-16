import type { DataTableProps, DataTableValue } from "primereact/datatable";

interface MyDataTableProps<T> {
  value?: T[];
}
// Creando la interfaz de propiedades para la tabla general
export interface GeneralTableProps extends MyDataTableProps<DataTableValue> {
  showButtonExport: boolean;
  columns: Record<string, any>;
  rowsData: DataTableValue[];
  tittle: string;
  staticscroll: boolean;
  stylescroll: string;
  on_edit?: (rowData?: any) => void;
}

export interface ActionTemplateProps {
  rowData: any;
}