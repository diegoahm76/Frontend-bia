import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { sub_interface_personas_viajan } from '../interfaces/types';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: sub_interface_personas_viajan }) => React.ReactNode;
}

interface Props {
  data_personas_viajan: sub_interface_personas_viajan[];
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaPersonasViajan: React.FC<Props> = ({
  data_personas_viajan,
}) => {

  const columns: CustomColumn[] = [
    { field: 'tipo_documento_persona_viaja', headerName: 'Tipo de documento', minWidth: 180, flex: 1, },
    { field: 'numero_documento_persona_viaja', headerName: 'Número de documento', minWidth: 180, flex: 1, },
    { field: 'nombre_persona_viaja', headerName: 'Nombres', minWidth: 350, flex: 1, },
    { field: 'celular_documento_persona_viaja', headerName: 'Celular', minWidth: 350, flex: 1, },
    { field: 'email_persona_viaja', headerName: 'Email', minWidth: 350, flex: 1, },
    { field: 'observacion', headerName: 'Observación', minWidth: 350, flex: 1, },
  ];

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