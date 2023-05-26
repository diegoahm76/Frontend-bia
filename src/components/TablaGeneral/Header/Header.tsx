import type { FC } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import type { Header_Table_Props } from './types/types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare
export const Header_Table: FC<Header_Table_Props> = ({
  columns,
  set_global_filter,
  global_filter,
  handle_export_csv,
  handle_export_excel,
  filters,
  set_filters
}: Header_Table_Props) => {
  // Función para limpiar el filtro global
  const clear_filter = (): void => {
    set_global_filter('');
  };
  // Creando el componente de encabezado de la tabla
  return (
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
                        [column.field]: e.value
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
                        [column.field]: e.currentTarget.value
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
                        [column.field]: e.value
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
};
