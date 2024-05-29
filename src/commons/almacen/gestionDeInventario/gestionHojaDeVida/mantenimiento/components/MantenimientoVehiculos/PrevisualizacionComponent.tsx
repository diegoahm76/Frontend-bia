/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { type crear_mantenimiento } from '../../interfaces/IProps';
import DeleteIcon from '@mui/icons-material/Delete';
import { RenderDataGrid } from '../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';

interface IProps {
  data_grid: crear_mantenimiento[];
  detalle_seleccionado_prop: any,
  limpiar_formulario: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrevisualizacionComponent: React.FC<IProps> = ({
  data_grid,
  detalle_seleccionado_prop,
  limpiar_formulario,
}: IProps) => {
  const [data_previsualizacion, set_data_previsualizacion] = useState<
    crear_mantenimiento[]
  >([]);

  useEffect(() => {
  const dataWithPlaca = data_grid.map(item => ({
    ...item,
    placa: detalle_seleccionado_prop?.doc_identificador_nro
  }));

  const newData = dataWithPlaca.filter((item) => {
    if (!item.kilometraje_programado) {
      return !data_previsualizacion.some((prevItem) => prevItem.fecha_programada === item.fecha_programada && prevItem.placa === item.placa);
    }
    else {
      return !data_previsualizacion.some((prevItem) => prevItem.kilometraje_programado === item.kilometraje_programado && prevItem.placa === item.placa);
    }
  });

  set_data_previsualizacion([...data_previsualizacion, ...newData]);
}, [data_grid]);

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
      renderCell: (params: any) => params.row?.cod_tipo_mantenimiento === 'C' ? 'Correctivo' : 'Preventivo',
      width: 230,
    },
    { field: 'placa', headerName: 'Placa', visible: true, width: 250, renderCell: (params: any) => params.row?.placa?.toUpperCase() },
    {
      field: 'kilometraje_programado',
      headerName: 'Kilometraje',
      visible: true,
      renderCell: (params: any) =>
      params.row.kilometraje_programado ? params.row.kilometraje_programado + ' km' : 'N/A',
      width: 100,
    },
    { field: 'fecha_programada', headerName: 'Fecha', visible: true, width: 120,
      renderCell: (params: any) => params.row.fecha_programada ? params.row.fecha_programada : 'N/A' },
    {
      field: 'tipo_programacion',
      headerName: 'Tipo de programación',
      visible: true,
      width: 200
    },
    {
      field: 'Acciones',
      headerName: 'Acciones',
      visible: true,
      renderCell: (params: any) => (
        <>
          <IconButton
              onClick={() => {
                handleDelete(params.row);
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <DeleteIcon
                  titleAccess="Eliminar mantenimiento"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
          </IconButton>
        </>
        // <button onClick={() => handleDelete(row)}>X</button>
      ),
      width: 100,
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
