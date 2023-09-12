import type { DataTableProps, DataTableValue } from "primereact/datatable";

// Creando la interfaz de propiedades para la tabla general
// @ts-ignore
export interface GeneralTableProps extends DataTableProps<any> {
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