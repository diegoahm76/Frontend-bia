/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// Importando todos los componentes y utilidades necesarias de 'primereact', 'api' y otras bibliotecas
import type React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type { DataTableProps, DataTableValue } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import type { InputNumberChangeEvent } from 'primereact/inputnumber';

// Creando la interfaz de propiedades para la tabla general
interface GeneralTableProps extends DataTableProps<any> {
  showButtonExport: boolean;
  columns: Record<string, any>;
  rowsData: DataTableValue[];
  tittle: string;
  staticscroll: boolean;
  stylescroll: string;
  on_edit?: (rowData?: any) => void;
}
interface ActionTemplateProps {
  rowData: any;
}

// Creando el componente TableGeneral
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaGeneral = ({
  showButtonExport,
  columns,
  rowsData,
  tittle,
  staticscroll,
  stylescroll,
  on_edit,
}: GeneralTableProps): JSX.Element => {
  // Definiendo las variables de estado y las referencias
  const table_ref = useRef<DataTable<any>>(null);
  const [global_filter, set_global_filter] = useState<string>('');
  const [filters, set_filters] = useState<Record<string, any>>({});
  const { desktop_open } = useSelector(
    (state: {
      layout: {
        desktop_open: boolean;
      };
    }) => state.layout
  );
  // Función para manejar la exportación a CSV
  const handle_export_csv = (): void => {
    table_ref.current?.exportCSV();
  };

  // Función para manejar la exportación a Excel
  const handle_export_excel = async (): Promise<void> => {
    try {
      const xlsx = await import('xlsx');
      const worksheet = xlsx.utils.json_to_sheet(rowsData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excel_buffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      save_as_excel_file(excel_buffer, tittle);
    } catch (error) {
      // Manejar el error de la promesa
    }
  };

  // Función para guardar el archivo Excel
  const save_as_excel_file = (buffer: Buffer, fileName: string): void => {
    import('file-saver')
      .then((module) => {
        const save_as_fn = module.default.saveAs;
        const excel_type =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excel_extension = '.xlsx';
        const data = new Blob([buffer], {
          type: excel_type,
        });

        save_as_fn(data, fileName + excel_extension);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clear_filter = (): void => {
    set_global_filter('');
  };
  // Creando el componente de encabezado de la tabla
  const header = (
    <>
      {/* Campo de búsqueda global */}
      <div className="flex align-items-center justify-content-start gap-2">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          outlined
          onClick={clear_filter}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={global_filter}
            onChange={(e) => {
              set_global_filter(e.currentTarget.value);
            }}
            placeholder="Search"
          />
        </span>

        <Button
          type="button"
          icon="pi pi-file"
          rounded
          onClick={handle_export_csv}
          tooltip="Export as CSV"
          style={{ marginLeft: '10px' }}
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handle_export_excel}
          tooltip="Export as Excel"
          style={{ marginLeft: '10px' }}
        />
        {/* Filtros de columnas */}

        {Object.keys(columns).map((col) => {
          const column = columns[col];
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (column.filter) {
            return (
              <div key={col} className="p-field">
                <label htmlFor={col}>{column.header}</label>
                {column.filter.type === 'multiSelect' && (
                  <MultiSelect
                    id={col}
                    value={filters[column.field]}
                    options={column.filter.options}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                      set_filters({
                        ...filters,
                        [column.field]: e.value,
                      })
                    }
                    optionLabel={column.filter.optionLabel}
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    placeholder={`Select ${column.header}`}
                    className="p-column-filter"
                  />
                )}
                {column.filter.type === 'text' && (
                  <InputText
                    id={col}
                    value={filters[column.field]}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                      set_filters({
                        ...filters,
                        [column.field]: e.currentTarget.value,
                      })
                    }
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    placeholder={`Search ${column.header}`}
                    className="p-column-filter"
                  />
                )}
                {column.filter.type === 'calendar' && (
                  <Calendar
                    id={col}
                    value={filters[column.field]}
                    onChange={(e) =>
                      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                      set_filters({
                        ...filters,
                        [column.field]: e.value,
                      })
                    }
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    placeholder={`Select ${column.header}`}
                    className="p-column-filter"
                    dateFormat="dd/mm/yy"
                  />
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );

  // Filtrando los datos de acuerdo a los filtros aplicados
  const filtered_data = rowsData.filter((rowData) =>
    Object.keys(filters).every((field) => {
      const filter_value = filters[field];
      const row_value = rowData[field];
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!filter_value || filter_value.length === 0) {
        return true;
      }
      // Filtrado para rangos de fechas y numéricos
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (filter_value.min || filter_value.max) {
        // Filtrado de rango de fechas
        if (row_value instanceof Date) {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          const min_date: Date | null = filter_value.min
            ? new Date(filter_value.min)
            : null;
          const max_date: Date | null = filter_value.max
            ? new Date(filter_value.max)
            : null;

          if (min_date && max_date) {
            return row_value >= min_date && row_value <= max_date;
          } else if (min_date) {
            return row_value >= min_date;
          } else if (max_date) {
            return row_value <= max_date;
          } else {
            return true;
          }
        }
        // Filtrado de rango numérico
        if (typeof row_value === 'number') {
          const min_value = filter_value.min || -Infinity;
          const max_value = filter_value.max || Infinity;
          return row_value >= min_value && row_value <= max_value;
        }
        return false;
      }
      // Filtrado para selección múltiple
      if (Array.isArray(filter_value)) {
        return filter_value.some((value) => value === row_value);
      }
      // Filtrado para texto
      if (typeof filter_value === 'string' || filter_value instanceof String) {
        return row_value
          .toString()
          .toLowerCase()
          .includes(filter_value.toLowerCase());
      }
      return row_value === filter_value;
    })
  );

  const render_advanced_filter = (column: any): React.ReactNode => {
    if (!column.filter) {
      return null;
    }
    // Filtro avanzado de rango de fechas para columnas de tipo calendario
    if (column.filter.type === 'calendar') {
      return (
        <div>
          <Calendar
            value={filters[column.field]?.min}
            onChange={(e) =>
              set_filters({
                ...filters,
                [column.field]: { ...filters[column.field], min: e.value },
              })
            }
            placeholder={`Min ${column.header}`}
            className="p-column-filter"
            dateFormat="dd/mm/yy"
          />
          <Calendar
            value={filters[column.field]?.max}
            onChange={(e) =>
              set_filters({
                ...filters,
                [column.field]: { ...filters[column.field], max: e.value },
              })
            }
            placeholder={`Max ${column.header}`}
            className="p-column-filter"
            dateFormat="dd/mm/yy"
          />
        </div>
      );
    }

    // Filtro avanzado de rango numérico para columnas de tipo numérico
    if (column.filter.type === 'numeric') {
      return (
        <div>
          <InputNumber
            value={filters[column.field]?.min}
            onChange={(e: InputNumberChangeEvent) =>
              set_filters({
                ...filters,
                [column.field]: { ...filters[column.field], min: e.value },
              })
            }
            placeholder={`Min ${column.header}`}
            className="p-column-filter"
          />
          <InputNumber
            value={filters[column.field]?.max}
            onChange={(e: InputNumberChangeEvent) =>
              set_filters({
                ...filters,
                [column.field]: { ...filters[column.field], max: e.value },
              })
            }
            placeholder={`Max ${column.header}`}
            className="p-column-filter"
          />
        </div>
      );
    }

    // Filtro avanzado de selección múltiple para columnas de tipo multiSelect
    if (column.filter.type === 'multiSelect') {
      return (
        <div>
          <MultiSelect
            value={filters[column.field]}
            options={column.filter.options}
            onChange={(e) =>
              set_filters({
                ...filters,
                [column.field]: e.value,
              })
            }
            optionLabel={column.filter.optionLabel}
            placeholder={`Select ${column.header}`}
            className="p-column-filter"
          />
        </div>
      );
    }
    // Filtro avanzado por coincidencias
    if (column.filter.type === 'match') {
      return (
        <div>
          <InputText
            value={filters[column.field]}
            onChange={(e) =>
              set_filters({
                ...filters,
                [column.field]: e.currentTarget.value,
              })
            }
            placeholder={`Search ${column.header}`}
            className="p-column-filter"
          />
        </div>
      );
    }

    // Agregar aquí otros tipos de filtros avanzados según sea necesario

    return null;
  };

  // Para calcular cuantos registros tiene la tabla
  const total_records = rowsData.length;
  const options_count = Math.ceil(total_records / 10);
  const rows_per_page_options = [];
  for (let i = 0; i < options_count; i++) {
    rows_per_page_options.push((i + 1) * 10);
  }

  const cell_color = (rowsData: DataTableValue): React.CSSProperties => {
    // Aquí puedes agregar la lógica para determinar el color en función del contenido de la fila

    switch (rowsData.status) {
      case 'unqualified':
        return { backgroundColor: 'red' };

      case 'qualified':
        return { backgroundColor: 'blue' };

      case 'new':
        return { backgroundColor: 'green' };

      case 'negotiation':
        return { backgroundColor: 'yellow' };
    }
    // Retorna un objeto vacío como valor predeterminado si no coincide ningún caso
    return {};
  };
  const custom_body = (
    rowData: DataTableValue,
    column: DataTableValue
  ): JSX.Element => {
    return <div style={cell_color(rowData)}>{rowData[column.field]}</div>;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
  const ActionTemplate: React.FC<ActionTemplateProps> = ({ rowData }) => (
    <div>
      {/* <Button icon="pi pi-pencil" onClick={() => on_edit(rowData)} /> */}
    </div>
  );

  // Renderizando el componente TableGeneral
  return (
    <>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        size="small"
        ref={table_ref}
        value={filtered_data}
        header={header}
        style={{ maxWidth: desktop_open ? 'calc(100vw - 390px)' : '94vw' }}
        // className="p-datatable-customers"
        rowHover
        globalFilter={global_filter}
        emptyMessage="No se encontraron registros"
        resizableColumns
        reorderableColumns
        reorderableRows
        paginator
        rows={10}
        totalRecords={total_records}
        rowsPerPageOptions={rows_per_page_options}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} registros"
        scrollable={staticscroll}
        scrollHeight={stylescroll}
      >
        <Column rowReorder style={{ width: '3rem' }} />
        {Object.keys(columns).map((col) => {
          const column: Record<string, any> = columns[col];

          return column.visible ? (
            <Column
              key={col}
              field={column.field}
              header={column.header}
              filter
              sortable
              filterPlaceholder={`Buscar por ${column.header}`}
              body={column.field === 'status' ? custom_body : null}
              // En lo posible, los estados estandarizarlos a status
              filterElement={render_advanced_filter(column)}
            />
          ) : null;
        })}
        <Column
          header="ACCIONES"
          body={(rowData: any) => <ActionTemplate rowData={rowData} />}
        />
      </DataTable>
    </>
  );
};

/** 
 
 ** en la pantalla donde llame le componente debe llamarlo con los siguientes parametros
*! importa el modulo
 * @param: const columns = [
  {field: 'nombre', header: 'nombre',visible: true},
  agrega cuntos registros necesite mostrar
];

* @param: const rows = [
{
  id: '1001',
  code: 'sdfsdf',
  name: 'Bamboo ssss',
  description: 'Product Descasdasdription',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 25,
  inventoryStatus: 'INSTOCK',
  rating: 5,
  status:'unqualified'
}
];

*! adiciona donde quierausar el componente bajo adicionando estas propiedades
<div className="App">
      <TableGeneral 
      show_button_export
      tittle={'Productos'} // titulo que dese mostrar al momento de bajar a excel no aplica para el csv
      columns={columns} //parametros de columnas antes declarados
      rowsData={rows} //rows antes declarados pusheados de la api
      staticscroll={true} //lo puede activar o no para dejar statica el header y hacer scroll
      stylescroll={"780px"} // va de la mano con el anterior para ajsutar ala pantalla procurar que no pase del tamapo de pantalla
       />
    </div>

* TODO: un breve ejemplo
import TableGeneral from './components/TableGeneral';

const columns = [
  {field: 'code', header: 'Code',visible: true},
  {field: 'name', header: 'Name',visible: false},
  {field: 'category', header: 'Category',visible: true},
  {field: 'quantity', header: 'Quantity',visible: true},
  {field: 'description', header: 'description',visible: true},
  {field: 'price', header: 'price',visible: true},
  {field: 'status', header: 'statuss',visible: true}
];

const rows = [
{
  id: '1001',
  code: 'sdfsdf',
  name: 'Bamboo ssss',
  description: 'Product Descasdasdription',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 25,
  inventoryStatus: 'INSTOCK',
  rating: 5,
  status:'unqualified'
}
];

function App() {
  return (
    <div className="App">
      <TableGeneral 
      show_button_export
      tittle={'Productos'} 
      columns={columns} 
      rowsData={rows}
      staticscroll={true}
      stylescroll={"780px"}
       />
    </div>
  );
}

export default App;


**/
