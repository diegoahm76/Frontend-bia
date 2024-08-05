import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_persona_solicita } from '../interfaces/types';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import dayjs from 'dayjs';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_persona_solicita }) => React.ReactNode;
}

interface Props {
  data_personas_viajan: interface_busqueda_persona_solicita[];
  set_data_personas_viajan: React.Dispatch<React.SetStateAction<interface_busqueda_persona_solicita[]>>;
  accion: string;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaPersonasViajan: React.FC<Props> = ({
  data_personas_viajan,
  set_data_personas_viajan,
  accion
}) => {

  const quitar_persona = (row: interface_busqueda_persona_solicita) => {
    const data = data_personas_viajan.filter((item) => item.id_persona !== row.id_persona);
    set_data_personas_viajan(data);
  }

  let columns: CustomColumn[] = [];

  if(accion === 'crear'){
    columns = [
      {
        field: 'tipo_persona', headerName: 'Tipo de persona', minWidth: 120, flex: 1,
        renderCell: (params) => params.row.tipo_persona === 'J' ? 'Jurídica' : 'Natural',
      },
      { field: 'numero_documento', headerName: 'Número de documento', minWidth: 120, flex: 1, },
      {
        field: 'primer_nombre', headerName: 'Nombres', minWidth: 120, flex: 1,
        renderCell: (params) => params.row.primer_nombre ?? '' + ' ' + params.row.segundo_nombre ?? '',
      },
      {
        field: 'primer_apellido', headerName: 'Apellidos', minWidth: 120, flex: 1,
        renderCell: (params) => params.row.primer_apellido ?? '' + ' ' + params.row.segundo_apellido ?? '',
      },
      { field: 'razon_social', headerName: 'Razón social', minWidth: 120, flex: 1, },
      { field: 'nombre_comercial', headerName: 'Nombre comercial', minWidth: 120, flex: 1, },
      { field: 'quitar', headerName: 'Quitar', maxWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
        renderCell: (params) => (
          <RemoveCircleOutlineIcon
            onClick={() => quitar_persona(params.row)}
            style={{ cursor: 'pointer', color: 'red'}}
          />
        )
      },
    ]
  }

  if(accion === 'ver'){
    columns = [
      {
        field: 'numero_documento_persona_viaja', headerName: 'Documento persona', minWidth: 120, flex: 1,
      },
      { field: 'nombre_persona_viaja', headerName: 'Nombres y apellidos', minWidth: 380, flex: 1, },
      {
        field: 'celular_documento_persona_viaja', headerName: 'Celular', minWidth: 120, flex: 1
      },
      {
        field: 'email_persona_viaja', headerName: 'Email', minWidth: 300, flex: 1,
      },
      { field: 'fecha_resgistro', headerName: 'Fecha de registro', minWidth: 120, flex: 1,
        valueFormatter: (value: any) => dayjs(value.value).format('DD/MM/YYYY'),
      },
      { field: 'fecha_confirmacion', headerName: 'Fecha confirmacion', minWidth: 120, flex: 1, 
        valueFormatter: (value: any) => dayjs(value.value).format('DD/MM/YYYY'),
      }
    ]
  }

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data_personas_viajan, columns })}
            {download_pdf({
              nurseries: data_personas_viajan,
              columns,
              title: 'Funcionarios Responsables',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={data_personas_viajan ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?.id_persona !== undefined ? row.id_persona : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaPersonasViajan;