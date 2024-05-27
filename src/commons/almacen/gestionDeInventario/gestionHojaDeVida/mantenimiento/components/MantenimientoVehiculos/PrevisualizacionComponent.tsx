/* eslint-disable @typescript-eslint/naming-convention */
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { type crear_mantenimiento } from '../../interfaces/IProps';
import { TablaGeneral } from '../../../../../../../components/TablaGeneral/TablaGeneral';
import { RenderDataGrid } from '../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';

interface IProps {
  data_grid: crear_mantenimiento[];
  limpiar_formulario: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrevisualizacionComponent: React.FC<IProps> = ({
  data_grid,
  limpiar_formulario,
}: IProps) => {
  const [data_previsualizacion, set_data_previsualizacion] = useState<
    crear_mantenimiento[]
  >([]);
  useEffect(() => {
    for (let m = 0; m < data_grid.length; m++) {
        console.log(data_grid[m], '23');
        console.log(data_previsualizacion, '24');
      set_data_previsualizacion((prevArray) => [...prevArray, data_grid[m]]);
    }
  }, [data_grid]);

  useEffect(() => {}, [data_previsualizacion]);

  useEffect(() => {
    if (limpiar_formulario) set_data_previsualizacion([]);
  }, [limpiar_formulario]);

  const handleDelete = (row: crear_mantenimiento) => {
    set_data_previsualizacion(prevArray => prevArray.filter(item => item !== row));
  };

  const columns = [
    // { field: "id_articulo", header: "Id", visible: true },
    {
      field: 'cod_tipo_mantenimiento',
      headerName: 'Tipo de mantenimiento',
      visible: true,
      renderCell: (row: any) => row?.cod_tipo_mantenimiento === 'C' ? 'Correctivo' : 'Preventivo',
      width: 280,
    },
    { field: 'doc_identificador_nro', headerName: 'Placa', visible: true, width: 250 },
    {
      field: 'kilometraje_programado',
      headerName: 'Kilometraje',
      visible: true,
      renderCell: (row: any) =>
        row.kilometraje_programado ? row.kilometraje_programado + ' km' : 'N/A',
      width: 300,
    },
    { field: 'fecha_programada', headerName: 'Fecha', visible: true, width: 350 },
    {
      field: 'tipo_programacion',
      headerName: 'Tipo de programación',
      visible: true,
      width: 350
    },
    {
      field: 'Acciones',
      headerName: 'Eliminar',
      visible: true,
      renderCell: (row: any) => (
        <button onClick={() => handleDelete(row)}>X</button>
      ),
      width: 350,
    },
  ];

  // Render the columns
  /*return (
    <div>
      {columns.map((column, index) =>
        column.visible ? (
          <Column
            key={index}
            field={column.field}
            header={column.header}
            filterPlaceholder={`Buscar por ${column.header}`}
            style={{ width: 'auto' }}
          />
        ) : null
      )}
    </div>
  );*/

/*  return column.visible ? (
    <Column
      key={col}
      field={column.field}
      header={column.header}
      filterPlaceholder={`Buscar por ${column.header}`}
      style={{ width: 'auto' }}
    />
  ) : null;*/

  return (
    <>
{/*
<>*/}
      <RenderDataGrid
        title="información"
        columns={columns}
        rows={data_previsualizacion}
      />
 {/*   </>
      <Box sx={{ width: '100%', mt: '20px' }}>
        <div className="App">
          <TablaGeneral
            showButtonExport
            tittle={'Productos'}
            columns={columns}
            rowsData={data_previsualizacion}
            staticscroll={true}
            stylescroll={'780px'}
          />
        </div>
      </Box>*/}
    </>
  );
};
