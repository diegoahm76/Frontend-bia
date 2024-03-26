import React, { useState, useEffect } from 'react';
import { interface_agendamientos_bitacora } from '../interfaces/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../../hooks';
import { listar_municipios } from "../thunks/bitacora_viajes";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ButtonGroup, Grid } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

interface CustomColumn extends GridColDef {
  renderCell?: (params: { row: interface_agendamientos_bitacora }) => React.ReactNode;
}

interface Props {
  set_mostrar_generar_bitacora: (value: boolean)=>void;
  data_table_bitacora: interface_agendamientos_bitacora[];
  set_data_solicitud_agendada: React.Dispatch<React.SetStateAction<interface_agendamientos_bitacora>>;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TableBitacoraViajes: React.FC<Props> = ({
  set_mostrar_generar_bitacora,
  set_data_solicitud_agendada,
  data_table_bitacora,
}) => {
  const dispatch = useAppDispatch();

  const [municipios, set_municipios] = useState<any>([]);

  const listar_municipios_fc: () => void = () => {
    dispatch(listar_municipios())
      .then((response: any) => {
        if (!response) {
          set_municipios([]);
        } else {
          set_municipios(response);
        }
      })
  }
  useEffect(()=>{
    if (municipios && municipios.length === 0){
      listar_municipios_fc();
    }
  },[])


  const generar_bitacora = (params: interface_agendamientos_bitacora) => {
    set_mostrar_generar_bitacora(true);
    set_data_solicitud_agendada(params);
  }

  const ver_bitacora = (params: interface_agendamientos_bitacora) => {
    set_mostrar_generar_bitacora(true);
    set_data_solicitud_agendada(params);
  }

  const columns: CustomColumn[] = [
    { field: 'estado', headerName: 'Estado', minWidth: 120, flex: 1,
      renderCell: ((res)=>(
        res.row.estado === 'FI' ? 'Finalizada' : res.row.estado === 'AC' && 'Activo'
      ))
    },
    { field: 'cod_municipio_destino', headerName: 'Municipio destino', minWidth: 120, flex: 1,
      renderCell: ((res)=> {
        if (municipios && municipios.length > 0) {
          return municipios.map((municipio: any)=>{
            if(municipio[0] === res.row.cod_municipio_destino){
              return municipio[1];
            }
          })
        }
      })
    },
    { field: 'nombre_conductor', headerName: 'Conductor asignado', minWidth: 120, flex: 1,
      renderCell: ((res)=>(
        res.row.nombre_conductor !== null && res.row.nombre_conductor + ' ' + res.row.apellido_conductor
      ))
    },
    { field: 'fecha_partida_asignada', headerName: 'Flecha salida', minWidth: 120, flex: 1,
      renderCell: ((res)=>(
        dayjs(res.row.fecha_partida_asignada).format('DD/MM/YYYY')
      ))
    },
    { field: 'hora_partida', headerName: 'Hora salida', minWidth: 120, flex: 1 },
    { field: 'fecha_retorno_asignada', headerName: 'Fecha retorno', minWidth: 120, flex: 1,
      renderCell: ((res)=>(
        dayjs(res.row.fecha_retorno_asignada).format('DD/MM/YYYY')
      ))
    },
    { field: 'hora_retorno', headerName: 'Hora retorno', minWidth: 120, flex: 1 },
    {
      field: 'accion',
      headerName: 'Accion',
      width: 80,
      align: 'center',
      renderCell: (res) => {
        if(res.row.estado === 'AC'){
          return <EditIcon
            sx={{ cursor: 'pointer', fontSize: '28px' }}
            onClick={() => generar_bitacora(res.row)}
          />
        } else if(res.row.estado === 'FI'){
          return <VisibilityIcon
            sx={{ cursor: 'pointer', fontSize: '28px' }}
            onClick={() => ver_bitacora(res.row)}
          />
        }
      },
    }
  ];

  return (
    <>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
              {download_xls({ nurseries: data_table_bitacora, columns })}
              {download_pdf({
                  nurseries: data_table_bitacora,
                  columns,
                  title: 'Bitácora de viajes',
              })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{margin:'15px 0px'}}
        density="compact"
        autoHeight
        rows={data_table_bitacora ?? []}
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
export default TableBitacoraViajes;