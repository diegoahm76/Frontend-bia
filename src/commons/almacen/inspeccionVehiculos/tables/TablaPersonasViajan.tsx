import React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { interface_busqueda_persona_solicita } from '../interfaces/types';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { control_error } from '../../../../helpers';


interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_busqueda_persona_solicita }) => React.ReactNode;
}

interface Props {
  data_personas_viajan: interface_busqueda_persona_solicita[];
  set_data_personas_viajan: React.Dispatch<React.SetStateAction<interface_busqueda_persona_solicita[]>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TablaPersonasViajan: React.FC<Props> = ({
  data_personas_viajan,
  set_data_personas_viajan,
}) => {

  const quitar_persona = (row: interface_busqueda_persona_solicita) => {
    const data = data_personas_viajan.filter((item) => item.id_persona !== row.id_persona);
    set_data_personas_viajan(data);
  }

  const handle_editar_celdas = (objeto_nuevo: any) => {
    set_data_personas_viajan(data_personas_viajan.map((persona) => {
      if (persona.id_persona === objeto_nuevo.id_persona) {
        if (!persona.persona_confirma_viaje) {
          if(persona.persona_agregada_inspeccion){
            control_error('No se puede agregar una justificación a la persona agregada en la inspección.') ;
          } else {
            return { ...persona, ...objeto_nuevo };
          }
        } else {
          control_error('No se puede agregar una justificación si la persona si va a viajar.');
        }
      }
      return persona;
    }));
    return { success: true };
  }

  const columns: CustomColumn[] = [
    {
      field: 'tipo_persona', headerName: 'Tipo de persona', minWidth: 120, flex: 1,
      renderCell: (params) => params.row.tipo_persona === 'J' ? 'Jurídica' : 'Natural',
    },
    { field: 'numero_documento', headerName: 'Número de documento', minWidth: 180, flex: 1, },
    {
      field: 'nombre_completo', headerName: 'Nombres', minWidth: 350, flex: 1,
    },
    { field: 'razon_social', headerName: 'Razón social', minWidth: 180, flex: 1, },
    { field: 'nombre_comercial', headerName: 'Nombre comercial', minWidth: 180, flex: 1, },
    {
      field: 'confirma_viaje', headerName: '¿Persona viaja?', minWidth: 160, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        if (!params.row.persona_agregada_inspeccion) {
          return (
            <FormControl required size="small" fullWidth>
              <InputLabel >Seleccione: </InputLabel>
              <Select
                label='Seleccione: '
                value={params.row.persona_confirma_viaje}
                onChange={(event) => {
                  // Actualiza el estado del viaje en la propiedad persona_confirma_viaje de la fila de set_data
                  const new_data = data_personas_viajan.map((row) => {
                    if (row.id_persona === params.row.id_persona) {
                      return { ...row, persona_confirma_viaje: event.target.value === 'true' ? true : false };
                    }
                    return row;
                  });
                  set_data_personas_viajan(new_data);
                }}
              >
                <MenuItem value={'true'}>Si viaja</MenuItem>
                <MenuItem value={'false'}>No viaja</MenuItem>
              </Select>
            </FormControl>
          )
        }
      }
    },
    { field: 'observacion', headerName: 'Observación no viaje', minWidth: 350, flex: 1, editable: true },
    {
      field: 'quitar', headerName: 'Quitar', maxWidth: 80, minWidth: 80, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.persona_agregada_inspeccion &&
        <RemoveCircleOutlineIcon
          onClick={() => quitar_persona(params.row)}
          style={{ cursor: 'pointer', color: 'red' }}
        />
      )
    },
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
        processRowUpdate={handle_editar_celdas}
        getRowId={(row) => row?.id_persona !== undefined ? row.id_persona : uuidv4()}
      />
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TablaPersonasViajan;