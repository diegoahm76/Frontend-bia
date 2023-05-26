/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';

export const RenderAdvancedFilter = ({ column, filters, set_filters }: any) => {
  const [minValue, setMinValue] = useState(filters[column.field]?.min || null);
  const [maxValue, setMaxValue] = useState(filters[column.field]?.max || null);
  const [selectedOptions, setSelectedOptions] = useState(
    filters[column.field] || []
  );

  const handleMinValueChange = (e: any) => {
    setMinValue(e.value);
    set_filters({
      ...filters,
      [column.field]: {
        ...filters[column.field],
        min: e.value
      }
    });
  };

  const handleMaxValueChange = (e: any) => {
    setMaxValue(e.value);
    set_filters({
      ...filters,
      [column.field]: {
        ...filters[column.field],
        max: e.value
      }
    });
  };

  const handleMultiSelectChange = (e: any) => {
    setSelectedOptions(e.value);
    set_filters({
      ...filters,
      [column.field]: e.value
    });
  };

  const handleTextChange = (e: any) => {
    set_filters({
      ...filters,
      [column.field]: e.currentTarget.value
    });
  };

  switch (column.filter?.type) {
    case 'calendar':
      return (
        <div>
          <Calendar
            value={minValue}
            onChange={handleMinValueChange}
            placeholder={`Min ${column.header}`}
            className="p-column-filter"
            dateFormat="dd/mm/yy"
          />
          <Calendar
            value={maxValue}
            onChange={handleMaxValueChange}
            placeholder={`Max ${column?.header}`}
            className="p-column-filter"
            dateFormat="dd/mm/yy"
          />
        </div>
      );

    case 'numeric':
      return (
        <div>
          <InputNumber
            value={minValue}
            onChange={handleMinValueChange}
            placeholder={`Min ${column.header}`}
            className="p-column-filter"
          />
          <InputNumber
            value={maxValue}
            onChange={handleMaxValueChange}
            placeholder={`Max ${column.header}`}
            className="p-column-filter"
          />
        </div>
      );

    case 'multiSelect':
      return (
        <div>
          <MultiSelect
            value={selectedOptions}
            options={column.filter.options}
            onChange={handleMultiSelectChange}
            optionLabel={column.filter.optionLabel}
            placeholder={`Select ${column.header}`}
            className="p-column-filter"
          />
        </div>
      );

    case 'match':
      return (
        <div>
          <InputText
            value={filters[column.field] || ''}
            onChange={handleTextChange}
            placeholder={`Search ${column.header}`}
            className="p-column-filter"
          />
        </div>
      );

    // Agregar aquí otros tipos de filtros avanzados según sea necesario

    default:
      return null;
  }
};

