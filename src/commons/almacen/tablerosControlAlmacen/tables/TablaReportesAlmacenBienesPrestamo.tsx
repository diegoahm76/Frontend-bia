/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { interface_almacen_bienes_prestamo } from '../interfaces/types';
import ExportDocs from '../../controlDeInventario/screens/ExportDocs';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_almacen_bienes_prestamo }) => React.ReactNode;
}

interface props {
  data: interface_almacen_bienes_prestamo[];
}

const TablaReportesAlmacenBienesPrestamo: React.FC<props> = ({
  data
}) => {

  let columns: custom_column[] = [
    {field: 'codigo_bien', headerName:'Código bien', minWidth:150, flex:1},
    {field: 'nombre_bien', headerName:'Nombre bien', minWidth:250, flex:1},
    {field: 'identificador_bien', headerName:'Placa / Serial', minWidth:150, flex:1},
    {field: 'nombre_marca', headerName:'Marca del bien', minWidth:150, flex:1},
    {field: 'numero_doc_origen', headerName:'Número origen', minWidth:140, flex:1},
    {field: 'fecha_ingreso', headerName:'Fecha ingreso', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'fecha_ultimo_movimiento', headerName:'Fecha del prestamo', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'fecha_devolucion', headerName:'Fecha devolución', minWidth:180, flex:1,
      valueFormatter: (params) => params.value ? dayjs(params.value as string).format('DD/MM/YYYY') : '',
    },
    {field: 'nombre_persona_responsable', headerName:'Funcionario responsable', minWidth:240, flex:1},
    {field: 'nombre_persona_origen', headerName:'Persona origen', minWidth:240, flex:1},
    {field: 'tipo_movimiento', headerName:'Tipo movimiento', minWidth:180, flex:1},
    {field: 'ubicacion', headerName:'Ubicación', minWidth:200, flex:1},
    {field: 'cantidad', headerName:'Cantidad', minWidth:120, flex:1},
    {field: 'valor_ingreso', headerName:'Valor ingreso', minWidth:140, flex:1},
    {field: 'valor_iva', headerName:'Valor iva', minWidth:140, flex:1},
    {field: 'valor_residual', headerName:'Valor residual', minWidth:140, flex:1},
    {field: 'valor_unitario', headerName:'Valor unitario', minWidth:140, flex:1},
    {field: 'valor_total', headerName:'Valor total', minWidth:140, flex:1},
    {field: 'depreciacion_valor', headerName:'Depreciación valor', minWidth:140, flex:1},
    {field: 'se_devolvio', headerName:'¿Se Devolvió?', minWidth:140, flex:1, valueGetter: (params) => params.row.se_devolvio == true ? 'Sí' : 'No'},
    {field: 'nombre_bodega', headerName:'Bodega', minWidth:200, flex:1},
    {field: 'nombre_categoria', headerName:'Categoria', minWidth:200, flex:1},
    {field: 'estado', headerName:'Estado', minWidth:180, flex:1},
  ];


  return (
    <>
    <Grid item container spacing={2}>
      <Grid item xs={12} sm={12}>
        <ExportDocs cols={columns} resultado_busqueda={data} filtros={null} title={'Reportes Almacén – Bienes (activos fijos) en préstamo'} nombre_archivo={'Reportes Almacén – Bienes (activos fijos) en préstamo'} filtros_pdf={null}></ExportDocs>
        <DataGrid
          style={{margin:'15px 0px'}}
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
export default TablaReportesAlmacenBienesPrestamo;