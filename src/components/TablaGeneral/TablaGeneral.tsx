/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// Importando todos los componentes y utilidades necesarias de 'primereact', 'api' y otras bibliotecas
import type React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type { DataTableValue } from 'primereact/datatable';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { ModalAtom } from '../Modal/ModalAtom';
import type { ActionTemplateProps, GeneralTableProps } from './types/types';
import { Header_Table } from './Header/Header';
import { RenderAdvancedFilter } from './AdvancedFilter/AdvancedFilter';

// Creando el componente TableGeneral

export const TablaGeneral = ({
  columns,
  rowsData,
  tittle,
  staticscroll,
  stylescroll
}: GeneralTableProps): JSX.Element => {
  // Definiendo las variables de estado y las referencias
  const table_ref = useRef<DataTable<any>>(null);
  const [global_filter, set_global_filter] = useState<string>('');
  const [filters, set_filters] = useState<Record<string, any>>({});

  const [modal_data, set_modal] = useState({
    show: false,
    id: 0
  });

  const desktop_open = useSelector(
    (state: { layout: { desktop_open: boolean } }) => state.layout.desktop_open
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
        type: 'array'
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
          type: excel_type
        });

        save_as_fn(data, fileName + excel_extension);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filtered_data = rowsData.filter((rowData) => {
    return Object.keys(filters).every((field) => {
      const filter_value = filters[field];
      const row_value = rowData[field];

      if (!filter_value || filter_value.length === 0) {
        return true;
      }

      if (filter_value.min || filter_value.max) {
        if (row_value instanceof Date) {
          const min_date = filter_value.min ? new Date(filter_value.min) : null;
          const max_date = filter_value.max ? new Date(filter_value.max) : null;

          if (min_date && max_date) {
            return min_date <= row_value && row_value <= max_date;
          } else if (min_date) {
            return min_date <= row_value;
          } else if (max_date) {
            return row_value <= max_date;
          } else {
            return true;
          }
        }

        if (typeof row_value === 'number') {
          const min_value = filter_value.min ?? -Infinity;
          const max_value = filter_value.max ?? Infinity;
          return min_value <= row_value && row_value <= max_value;
        }

        return false;
      }

      if (Array.isArray(filter_value)) {
        return filter_value.includes(row_value);
      }

      if (typeof filter_value === 'string') {
        return row_value
          .toString()
          .toLowerCase()
          .includes(filter_value.toLowerCase());
      }

      return row_value === filter_value;
    });
  });

  // Para calcular cuantos registros tiene la tabla
  const total_records = rowsData.length;
  const options_count = Math.ceil(total_records / 10);
  const rows_per_page_options = Array.from(
    { length: options_count },
    (_, i) => (i + 1) * 10
  );

  const cell_color = (rowsData: DataTableValue): React.CSSProperties => {
    // Lógica mejorada para determinar el color en función del contenido de la fila
    const color_map: Record<string, string> = {
      unqualified: 'red',
      qualified: 'blue',
      new: 'green',
      negotiation: 'yellow'
    };

    const default_color = '';

    // Comprueba si el estado existe en el mapa de colores
    if (rowsData.status && color_map[rowsData.status]) {
      return { backgroundColor: color_map[rowsData.status] };
    }

    // Retorna el color predeterminado si no coincide ningún caso
    return { backgroundColor: default_color };
  };

  const custom_body = (
    rowData: DataTableValue,
    column: DataTableValue
  ): JSX.Element => {
    return <div style={cell_color(rowData)}>{rowData[column.field]}</div>;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
  const ActionTemplate: React.FC<ActionTemplateProps> = ({ rowData }) => {
    /* console.log(rowData); */
    return (
      <div>
        <Button
          icon="pi pi-ellipsis-v"
          onClick={() => {
            set_modal({
              ...modal_data,
              show: true,
              id: rowData.id_auditoria
            });
          }}
        />
      </div>
    );
  };

  // Renderizando el componente TableGeneral
  return (
    <>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        size="small"
        ref={table_ref}
        value={filtered_data}
        header={
          <Header_Table
            columns={columns}
            filters={filters}
            set_filters={set_filters}
            global_filter={global_filter}
            set_global_filter={set_global_filter}
            handle_export_excel={handle_export_excel}
            handle_export_csv={handle_export_csv}
          />
        }
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
              filterElement={
                <RenderAdvancedFilter
                  column={column}
                  filters={filters}
                  set_filters={set_filters}
                />
              }
            />
          ) : null;
        })}
        <Column
          header="ACCIONES"
          body={(rowData: any) => <ActionTemplate rowData={rowData} />}
        />
      </DataTable>

      <ModalAtom
        data={modal_data}
        arrayToRender={rowsData}
        set_modal={set_modal}
      />
    </>
  );
};
