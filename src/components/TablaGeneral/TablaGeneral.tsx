/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention

// Importando todos los componentes y utilidades necesarias de 'primereact', 'api' y otras bibliotecas
import type React from 'react';
import {  useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { ModalAtom } from '../Modal/ModalAtom';
import type { ActionTemplateProps, GeneralTableProps } from './types/types';
import { ButtonGroup } from '@mui/material';
import { download_xls_dos } from '../../documentos-descargar/XLS_descargar';
import { download_pdf_dos } from '../../documentos-descargar/PDF_descargar';

// Creando el componente TableGeneral
export const TablaGeneral = ({
  columns,
  rowsData,
  tittle,
  staticscroll,
  stylescroll
}: GeneralTableProps): JSX.Element => {
// //  console.log('')(columns);
// //  console.log('')("____________________");
// //  console.log('')(rowsData);
  // Estado para almacenar los valores de los filtros aplicados
  const [filters] = useState<Record<string, any>>({});

  // Estado para controlar la visibilidad de un modal y el ID asociado
  const [modal_data, set_modal] = useState({
    show: false,
    id: 0
  });

  // Obteniendo el estado 'desktop_open' desde el store de Redux


  // Filtrado de datos
  const filtered_data = rowsData.filter((rowData) => {
    return Object.keys(filters).every((field) => {
      const filter_value = filters[field];
      const row_value = rowData[field];

      if (!filter_value || filter_value.length === 0) {
        return true;
      }

      // Filtros basados en rangos de fecha o números
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

      // Filtros para arrays, strings y otros tipos de datos
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

  // Cálculo del número total de registros y opciones de paginación
  const total_records = rowsData.length;
  const options_count = Math.ceil(total_records / 10);
  const rows_per_page_options = Array.from(
    { length: options_count },
    (_, i) => (i + 1) * 10
  );


  // Componente de plantilla de acción para las filas de la tabla
  const ActionTemplate: React.FC<ActionTemplateProps> = ({ rowData }) => {
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
      <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

      {download_xls_dos({ nurseries: filtered_data, columns:columns as any[]  })}
      {download_pdf_dos({ nurseries: filtered_data, columns, title: tittle })}

      </ButtonGroup>
      <DataTable
        size="small"
        value={filtered_data}
        style={{ maxWidth: 'calc(100vw - 390px)' }}
        rowHover
        emptyMessage="No se encontraron registros"
        resizableColumns
        reorderableColumns
        reorderableRows
        paginator
        rows={10}
        totalRecords={total_records}
        rowsPerPageOptions={rows_per_page_options}
        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} registros"
        scrollable={staticscroll}
        scrollHeight={stylescroll}
      >
        <Column rowReorder />
        {Object.keys(columns).map((col) => {
          const column: Record<string, any> = columns[col];

          return column.visible ? (
            <Column
              key={col}
              field={column.field}
              header={column.header}
              filterPlaceholder={`Buscar por ${column.header}`}
              style={{ width: 'auto' }}
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
