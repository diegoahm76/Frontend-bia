/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { ButtonGroup, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import { data_solicitud_viaje } from "../interfaces/types";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { elimiar_solicitud_viaje } from "../thunks/viajes";
import { useAppDispatch } from "../../../../hooks";
import { control_success } from "../../../../helpers";
import Swal from "sweetalert2";
import { FC, useEffect } from "react";
import { download_xls } from "../../../../documentos-descargar/XLS_descargar";
import { download_pdf } from "../../../../documentos-descargar/PDF_descargar";



interface props_table {
  data_row_solicitud_viaje: data_solicitud_viaje[];
  set_refrescar_tabla: React.Dispatch<React.SetStateAction<boolean>>;
  refrescar_tabla: boolean;
  obtener_solicitudes_fc: () => void;
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  set_mostrar_solicitud_viaje: React.Dispatch<React.SetStateAction<boolean>>;
  set_id_solicitud_editar: React.Dispatch<React.SetStateAction<number>>;
}

interface custom_column extends GridColDef {
  renderCell?: (params: { row: data_solicitud_viaje }) => React.ReactNode;
}

const TableSolicitudViajes: FC<props_table> = ({
  obtener_solicitudes_fc,
  data_row_solicitud_viaje,
  set_refrescar_tabla,
  refrescar_tabla,
  set_accion,
  set_mostrar_solicitud_viaje,
  set_id_solicitud_editar
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //console.log(data_row_solicitud_viaje);    
  }, [])

  /**
   * Muestra la solicitud de viaje en modo de visualización.
   * 
   * @param {data_solicitud_viaje} params - Objeto que representa los parámetros de la solicitud de viaje.
   * @returns {void}
   */
  const ver_solicitud = (params: data_solicitud_viaje) => {
    set_mostrar_solicitud_viaje(true);
    set_id_solicitud_editar(Number(params.id_solicitud));
    set_accion('ver');
  }

  /**
   * Inicia la edición de la solicitud de viaje.
   * 
   * @param {data_solicitud_viaje} params - Objeto que contiene los parámetros de la solicitud de viaje a editar.
   * @returns {void}
   */
  const editar_solicitar = (params: data_solicitud_viaje) => {
    set_mostrar_solicitud_viaje(true);
    set_id_solicitud_editar(Number(params.id_solicitud));
    set_accion('editar');
  }

  /**
   * Inicia el proceso de eliminación de una solicitud de viaje.
   * Muestra un modal de confirmación antes de realizar la eliminación.
   * 
   * @param {data_solicitud_viaje} params - Objeto que contiene los parámetros de la solicitud de viaje a eliminar.
   * @returns {Promise<void>} - Una promesa que resuelve después de la confirmación y, si procede, la eliminación de la solicitud.
   */
  const eliminar_solicitud = async (params: data_solicitud_viaje) => {
    const modal_confirmar_eliminacion = await Swal.fire({
      title: '¿Está seguro que desea eliminar esta solicitud?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        set_mostrar_solicitud_viaje(false);
        dispatch(elimiar_solicitud_viaje(params.id_solicitud)).then((response: { success: boolean, detail: string, data: any }) => {
          if (response.success) {
            control_success('Se elimino la solicitud correctamente');
          }
        })
        return true;
      } else if (result.isDenied) {
        return false;
      }
    });
    if (modal_confirmar_eliminacion) {
      obtener_solicitudes_fc();
      set_refrescar_tabla(!refrescar_tabla);
    }
  }


  const columns: custom_column[] = [
    {
      field: 'estado_solicitud', headerName: 'Estado', width: 150, flex: 1,
      renderCell: ((res) => (
        res.row.estado_solicitud === 'RC' ? 'Rechazada'
          : res.row.estado_solicitud === 'ES' ? 'En Espera'
            : res.row.estado_solicitud === 'FN' ? 'Finalizada'
              : res.row.estado_solicitud === 'AP' ? 'Aprobada'
                : res.row.estado_solicitud === 'RE' && 'Respondida'
      ))
    },
    { field: 'fecha_solicitud', headerName: 'Fecha Solicitud', width: 150, flex: 1 },
    { field: 'nro_pasajeros', headerName: 'N° Pasajeros', width: 150, flex: 1 },
    { field: 'fecha_partida', headerName: 'Fecha Salida', width: 150, flex: 1 },
    { field: 'fecha_retorno', headerName: 'Fecha Retorno', width: 150, flex: 1 },
    { field: 'cod_municipio', headerName: 'Municipio Destino', width: 150, flex: 1 },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: ((params) => {
        return <DeleteForeverIcon
          sx={{ cursor: 'pointer', color: '#e72929', fontSize: '28px', display: params.row.estado_solicitud === 'Finalizada' ? 'none' : 'inline-block' }}
          onClick={() => eliminar_solicitud(params.row)}
        />
      }),
    },
    {
      field: 'ver',
      headerName: 'Ver',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.estado_solicitud === 'FN' || params.row.estado_solicitud === 'RE') {
          return <VisibilityIcon
            sx={{ cursor: 'pointer', fontSize: '28px' }}
            onClick={() => ver_solicitud(params.row)}
          />
        }
      }
    },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <ModeEditIcon
          sx={{ cursor: 'pointer', color: '#138bda', fontSize: '28px', display: params.row.estado_solicitud === 'Rechazada' ? 'inline-block' : 'none' }}
          onClick={() => editar_solicitar(params.row)}
        />
      ),
    }
  ]

  return (
    <Grid container>
      <Grid item xs={12} container
        direction="row"
        justifyContent="flex-end"
        alignItems="center" >
        <Grid item  >
          <ButtonGroup style={{ margin: 5, }}>
            {download_xls({ nurseries: data_row_solicitud_viaje, columns })}
            {download_pdf({
              nurseries: data_row_solicitud_viaje,
              columns,
              title: 'Solicitudes de viajes',
            })}
          </ButtonGroup>
        </Grid>
      </Grid>

      <DataGrid
        style={{ margin: '15px 0px' }}
        density="compact"
        autoHeight
        rows={data_row_solicitud_viaje ?? []}
        columns={columns ?? []}
        pageSize={5}
        rowHeight={75}
        rowsPerPageOptions={[10]}
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
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TableSolicitudViajes;