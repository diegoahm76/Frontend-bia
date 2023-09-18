import  { type DataTableProps, type DataTableValue } from "primereact/datatable";

// Creando la interfaz de propiedades para la tabla general
export interface GeneralTableProps {
  showButtonExport: boolean;
  columns: Record<string, any>;
  rowsData: DataTableValue[];
  tittle: string;
  staticscroll: boolean;
  stylescroll: string;
  on_edit?: (rowData?: any) => void;
  [key: string]: any;
}

export interface ActionTemplateProps {
  rowData: any;
}