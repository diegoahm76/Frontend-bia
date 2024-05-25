/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridCallbackDetails, GridCellEditCommitParams, GridColDef, GridRowId, MuiEvent } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { interface_busqueda_avanzada_bienes } from '../interfaces/types';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import CancelIcon from '@mui/icons-material/Cancel';

interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_avanzada_bienes }) => React.ReactNode;
}

interface props {
  bienes_seleccionados: interface_busqueda_avanzada_bienes[];
  set_bienes_seleccionados: React.Dispatch<React.SetStateAction<interface_busqueda_avanzada_bienes[]>>;
  accion: string;
}



const TablaBienesBaja: React.FC<props> = ({ bienes_seleccionados, set_bienes_seleccionados, accion }) => {


  const quitar_bien = (bien: interface_busqueda_avanzada_bienes) => {
    console.log(bienes_seleccionados);

    const bienes_sin_bien_eliminado = bienes_seleccionados.filter((bien_temp) => bien_temp.id_bien !== bien.id_bien);
    set_bienes_seleccionados(bienes_sin_bien_eliminado);
  }

  const handle_editar_celdas = (objeto_nuevo: any) => {
    set_bienes_seleccionados(bienes_seleccionados.map((bien) => {
      if (bien.id_bien === objeto_nuevo.id_bien) {
        return { ...bien, ...objeto_nuevo };
      }
      return bien;
    }));
    return { success: true };
  }


  let columns: custom_column[] = [
    { field: 'codigo_bien', headerName: 'Codigo bien', width: 150, flex: 1 },
    { field: accion === 'crear' ? 'nombre_bien' : 'nombre', headerName: 'Nombre bien', width: 150, flex: 1 },
    { field: 'nombre_marca', headerName: 'Marca', width: 150, flex: 1 },
    { field: accion === 'crear' ? 'identificador_bien': 'doc_identificador_nro', headerName: 'Identificador bien', width: 150, flex: 1 },
    { field: 'valor_unitario', headerName: 'Valor unitario', width: 150, flex: 1 },
    { field: 'depreciacion_valor', headerName: 'Valor depreciación', width: 150, flex: 1 },
    //fila para agregar una justificacion, que la escribe el usuario, es decir es editable
    { field: 'justificacion_baja_activo', headerName: 'Justificacion', width: 150, flex: 1, editable: true, },
  ]

  if (accion === 'crear') {
    columns.push(
      {
        field: 'eliminar', headerName: 'Quitar', maxWidth: 80, flex: 1, headerAlign: 'center', align: 'center',
        renderCell: (params) => {
          return (
            <CancelIcon
              onClick={() => quitar_bien(params.row)}
              sx={{ color: '#d32f2f', fontSize: '34px', cursor: 'pointer' }} />
          );
        }
      },
    )
  }

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: bienes_seleccionados, columns })}
            {download_pdf({
              nurseries: bienes_seleccionados,
              columns,
              title: 'Bienes de baja',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={bienes_seleccionados ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={handle_editar_celdas}

        getRowId={(row) => row?.id_bien === undefined ? uuidv4() : row.id_bien}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaBienesBaja;