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
import ExportDocs from '../../controlDeInventario/screens/ExportDocs';

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
    { field: 'consecutivo', headerName: 'Consecutivo', minWidth: 150, flex: 1 },
    { field: 'codigo_bien', headerName: 'Código bien', minWidth: 150, flex: 1 },
    { field: 'nombre', headerName: 'Nombre del vehículo', minWidth: 150, flex: 1 },
    { field: 'placa', headerName: 'Placa', minWidth: 150, flex: 1 },
    { field: 'marca', headerName: 'Marca', minWidth: 150, flex: 1 },
    { field: 'tipo_vehiculo', headerName: 'Tipo vehículo', minWidth: 150, flex: 1 },
    { field: 'responsable', headerName: 'Responsable del vehículo', minWidth: 300, flex: 1,
      renderCell: (params) => `${params.row.primer_nombre_responsable_vehiculo} ${params.row.primer_apellido_responsable_vehiculo}`
    },
    {
      field: 'fecha_partida_asignada', headerName: 'Fecha de salida', minWidth: 150, flex: 1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : ''
    },
    {
      field: 'hora_partida', headerName: 'Hora de salida', minWidth: 150, flex: 1},
    {
      field: 'fecha_retorno_asignada', headerName: 'Fecha de llegada', minWidth: 150, flex: 1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : ''
    },
    {field: 'hora_retorno', headerName: 'Hora de llegada', minWidth: 150, flex: 1},
    { field: 'Municipio_desplazamiento', headerName: 'Municipio de desplazamiento', minWidth: 220, flex: 1 },
    { field: 'funcionario_autorizo', headerName: 'Funcionario que autorizó', minWidth: 300, flex: 1 },
    { field: 'ya_inicio', headerName: '¿Viaje inicio?', minWidth: 150, flex: 1,
      renderCell: (params) => params.row.ya_inicio ? 'Si' : 'No'
    },
    { field: 'ya_llego', headerName: '¿Viaje termino?', minWidth: 150, flex: 1,
      renderCell: (params) => params.row.ya_llego ? 'Si' : 'No'
    },
  ]

  return (
    <>
     <Grid item container spacing={2}>
      <Grid item xs={12} sm={12}>
        <ExportDocs cols={columns} resultado_busqueda={data} filtros={null} title={'Histórico de Uso de Vehículos'} nombre_archivo={'Histórico de Uso de Vehículos'} filtros_pdf={null}></ExportDocs>
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
      </Grid>
     </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaHistoricoUsoVehiculos;