/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import { Column, type ColumnProps } from 'primereact/column';
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
interface Level {
  level: number;
  column_id: string;
  table_name: string;
  columns: ColumnProps[];
  property_name: string;
}

interface IProps {
  products: any[];
  definition_levels: Level[];
  selectedItem: any;
  setSelectedItem: any;
  expandedRows: DataTableExpandedRows | DataTableValueArray | undefined;
  setExpandedRows: any;
  onRowToggleFunction: any;
  initial_allow_expansion?: boolean;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const TableRowExpansion = ({
  products,
  definition_levels,
  selectedItem,
  setSelectedItem,
  setExpandedRows,
  expandedRows,
  onRowToggleFunction,
  initial_allow_expansion,
}: IProps) => {
  const allow_expansion = (rowData: any) => {
    for (const propiedad in rowData) {
      if (Array.isArray(rowData[propiedad])) {
        return rowData[propiedad]!.length > 0;
      }
    }
    return false;
  };

  const rowExpansionTemplate = (data: any) => {
    for (const propiedad in data) {
      if (Array.isArray(data[propiedad])) {
        const definition_level = definition_levels.find(
          (objeto: Level) => objeto.property_name === propiedad
        );
        if (definition_level !== undefined) {
          return (
            <div className="p-3">
              <h5>{definition_level.table_name}</h5>
              <DataTable
                size="small"
                metaKeySelection={true}
                selectionMode={'single'}
                selection={selectedItem}
                onSelectionChange={(e) => setSelectedItem(e.value)}
                value={data[propiedad]}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey={definition_level.column_id}
                tableStyle={{ minWidth: '50rem', overflowX: 'visible' }}
              >
                <Column expander={allow_expansion} style={{ width: '5rem' }} />

                {definition_level.columns.map((option, index) => (
                  <Column
                    key={index}
                    field={option.field}
                    header={option.header}
                    body={option.body}
                    sortable={option.sortable}
                  />
                ))}
              </DataTable>
            </div>
          );
        }
      }
    }
    return <div>Sin datos disponibles</div>;
  };

  return (
    <div className="card">
      <DataTable
        scrollable={true}
        scrollHeight="10"
        size="small"
        metaKeySelection={true}
        selectionMode={'single'}
        selection={selectedItem}
        onSelectionChange={(e) => {
          console.log(e.value);
          setSelectedItem(e.value)
        }}
        value={products}
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          setExpandedRows(e.data);
          onRowToggleFunction(e);
        }}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey={definition_levels[0].column_id}
        tableStyle={{ minWidth: '50rem', overflowX: 'visible' }}
      >
        <Column
          expander={(initial_allow_expansion ?? false) || allow_expansion}
          style={{ width: '5rem' }}
        />

        {definition_levels[0].columns.map((option, index) => (
          <Column
            key={index}
            field={option.field}
            header={option.header}
            body={option.body}
            sortable={option.sortable}
          />
        ))}
      </DataTable>
    </div>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default TableRowExpansion;
