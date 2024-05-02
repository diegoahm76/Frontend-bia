/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import { interface_historico_vehiculo } from '../interfaces/types';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_historico_vehiculo }) => React.ReactNode;
}

interface props {
  data: interface_historico_vehiculo[];
}

const TablaHistoricoUsoVehiculos: React.FC<props> = ({
  data
}) => {

  let columns: custom_column[] = [
    { field: 'nombre', headerName: 'Nombre del vehículo', minWidth: 150, flex: 1 },
    { field: 'placa', headerName: 'Placa', minWidth: 150, flex: 1 },
    { field: 'marca', headerName: 'Marca', minWidth: 150, flex: 1 },
    { field: 'tipo_vehiculo', headerName: 'Tipo vehículo', minWidth: 150, flex: 1 },
    { field: 'PENDIENTE', headerName: 'Responsable del vehículo', minWidth: 150, flex: 1 },
    {
      field: 'fecha_partida_asignada', headerName: 'Fecha de salida', minWidth: 150, flex: 1,
      valueFormatter: (params) => dayjs(params.value as string).format('DD/MM/YYYY')
    },
    {
      field: 'hora_partida', headerName: 'Hora de salida', minWidth: 150, flex: 1},
    {
      field: 'fecha_retorno_asignada', headerName: 'Fecha de llegada', minWidth: 150, flex: 1,
      valueFormatter: (params) => dayjs(params.value as string).format('DD/MM/YYYY')
    },
    {field: 'hora_retorno', headerName: 'Hora de llegada', minWidth: 150, flex: 1},
    { field: 'Municipio_desplazamiento', headerName: 'Municipio de desplazamiento', minWidth: 150, flex: 1 },
    { field: 'funcionario_autorizo', headerName: 'Funcionario que autorizó', minWidth: 150, flex: 1 },
    { field: 'ya_inicio', headerName: '¿Viaje inicio?', minWidth: 150, flex: 1,
      renderCell: (params) => params.row.ya_inicio ? 'Si' : 'No'
    },
    { field: 'ya_llego', headerName: '¿Viaje termino?', minWidth: 150, flex: 1,
      renderCell: (params) => params.row.ya_llego ? 'Si' : 'No'
    },
  ]

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item sx={{ cursor: 'pointer' }}>
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data, columns })}
            {download_pdf({
              nurseries: data,
              columns,
              title: 'Articulos agregados a la solicitud',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={data ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row.id_bien === undefined ? uuidv4() : row.id_bien}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaHistoricoUsoVehiculos;