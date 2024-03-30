/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { v4 as uuidv4 } from 'uuid';
import { interface_anexo_opcional } from '../interfaces/types';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { control_error, control_success } from '../../../../helpers';
import { delete_anexo_opcional } from '../thunks/baja_activos';



interface custom_column extends GridColDef {
  renderCell?: (params: { row: interface_anexo_opcional }) => React.ReactNode;
}

interface props {
  data_anexos_opcionales: interface_anexo_opcional[];
  refrescar_tabla: boolean;
  set_refrescar_tabla: React.Dispatch<React.SetStateAction<boolean>>;
  anexos_optenidos: React.MutableRefObject<boolean>;
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  set_data_anexo_editar: React.Dispatch<React.SetStateAction<interface_anexo_opcional>>;
}

const TablaOtrosAnexosOpcionales: React.FC<props> = ({
  data_anexos_opcionales,
  refrescar_tabla,
  set_refrescar_tabla,
  anexos_optenidos,
  set_accion,
  set_data_anexo_editar
}) => {

  const dispatch = useDispatch();

  const delete_anexo_opcional_fc = (params: interface_anexo_opcional) => {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este anexo?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        await dispatch(delete_anexo_opcional(params.id_baja_activo.id_baja_activo, params.id_anexo_doc_alma))
        .then((response: any) => {
          if(Object.keys(response).length !== 0){
            if (response.success) {
              control_success('Se elimino el anexo correctamente');
            } else {
              control_error('No se encontro el id del anexo a eliminar, refresque la pagina e intente nuevamente');
            }
          } else {
            control_error('Error al intentar eliminar el anexo');
          }
        })

        anexos_optenidos.current = false;
        set_refrescar_tabla(!refrescar_tabla);
        return true;
      } else if(result.isDenied){
        return false;
      }
    });  
  }
  
  const eliminar_anexo_opcional = (params: interface_anexo_opcional) => {
    delete_anexo_opcional_fc(params);
  }

  const editar_anexo_opcional = (params: interface_anexo_opcional) => {
    set_accion('editar');
    set_refrescar_tabla(!refrescar_tabla);
    set_data_anexo_editar(params);
  }

  const columns: custom_column[] = [
    {field: 'nombre_anexo', headerName:'Nombre del anexo', minWidth:250, flex:1},
    {field: 'fecha_creacion_anexo', headerName:'Fecha creación', maxWidth:120, flex:1,
      renderCell: (params) => dayjs(params.row.fecha_creacion_anexo).format('DD/MM/YYYY')},
    {field: 'nro_folios', headerName:'Número de folios', maxWidth:140, flex:1},
    {field: 'descripcion_anexo', headerName:'Descripción del anexo', minWidth:350, flex:1},
    { field: 'eliminar', headerName: 'Eliminar', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.nombre_anexo !== 'Resolución aprobada por el comité' &&
        <DeleteForeverIcon 
          onClick={() => eliminar_anexo_opcional(params.row)}
          sx={{fontSize: '30px', cursor: 'pointer', color:'#c62828'}} />
      )
    },
    { field: 'editar', headerName: 'Editar', maxWidth: 70, flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        params.row.nombre_anexo !== 'Resolución aprobada por el comité' &&
        <EditIcon 
          onClick={() => editar_anexo_opcional(params.row)}
          sx={{fontSize: '30px', cursor: 'pointer', color: '#1071b2'}} />
      )
    },
  ]

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_anexos_opcionales, columns })}
              {download_pdf({
                  nurseries: data_anexos_opcionales,
                  columns,
                  title: 'Anexos opcionales',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        rows={data_anexos_opcionales ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={() => {
          try {
            return uuidv4();
          } catch (error) {
            console.error(error);
            //? Genera un ID de respaldo único
            return `fallback-id-${Date.now()}-${Math.random()}`;
          }
        }}
      />
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default TablaOtrosAnexosOpcionales;