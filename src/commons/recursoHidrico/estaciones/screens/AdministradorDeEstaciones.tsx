/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, CircularProgress, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import type { Datos, Estaciones } from '../interfaces/interfaces';
import type { AxiosError } from 'axios';
import {
  consultar_estaciones,
  consultar_datos_id,
  control_success,
  eliminar_estacion,
} from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { CrearEstacionDialog } from '../components/CrearEstacionDialog';
import { EditarEstacionDialog } from '../components/EditarEstacionDialog';
import Swal from 'sweetalert2';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministradorDeEstaciones: React.FC = () => {
  const [list_estaciones, set_estaciones] = useState<Estaciones[]>([]);
  const [dato, set_dato] = useState<any>(null);
  const [crear_estacion_is_active, set_crear_estacion_is_active] =
    useState<boolean>(false);
  const [editar_estacion_is_active, set_editar_estacion_is_active] =
    useState<boolean>(false);
  const [estacion_editado, set_estacion_editado] = useState(null);

  const handle_open_crear_estacion = (): void => {
    set_crear_estacion_is_active(true);
  };

  const columns: GridColDef[] = [
    { field: 'id_estacion', headerName: 'NÚMERO', width: 140 },
    {
      field: 'fecha_modificacion',
      headerName: 'FECHA MOD.',
      width: 170,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDate;
      },
    },
    { field: 'nombre_estacion', headerName: 'NOMBRE', width: 170 },
    { field: 'cod_tipo_estacion', headerName: 'COD. ESTACIÓN', width: 170 },
    { field: 'latitud', headerName: 'LATITUD', width: 170 },
    { field: 'longitud', headerName: 'LONGITUD', width: 170 },
    { field: 'indicaciones_ubicacion', headerName: 'INDICACIONES', width: 170 },
    {
      field: 'fecha_modificacion_coordenadas',
      headerName: 'FECHA MOD. COORDENADAS',
      width: 170,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDate;
      },
    },
    {
      field: 'nombre_persona_modifica',
      headerName: 'PERSONA MODIFICA',
      width: 200,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <EditIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                onClick={() => {
                  set_estacion_editado(params.row);
                  set_editar_estacion_is_active(!editar_estacion_is_active);
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            onClick={() => {
              void traer_dato({ estacion: { value: params.row.id_estacion } });
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              if (dato) {
                <CircularProgress color="secondary" />;
              }
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <DeleteIcon
                sx={{ color: 'red', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const estacion = async (): Promise<void> => {
    try {
      set_estaciones([]);
      const response = await consultar_estaciones();
      const new_estacion = response.map((estaciones: Estaciones) => ({
        id_estacion: estaciones.id_estacion,
        fecha_modificacion: estaciones.fecha_modificacion,
        nombre_estacion: estaciones.nombre_estacion,
        cod_tipo_estacion: estaciones.cod_tipo_estacion,
        cod_municipio: estaciones.cod_municipio,
        latitud: estaciones.latitud,
        longitud: estaciones.longitud,
        indicaciones_ubicacion: estaciones.indicaciones_ubicacion,
        fecha_modificacion_coordenadas:
          estaciones.fecha_modificacion_coordenadas,
        nombre_persona_modifica: estaciones.nombre_persona_modifica,
      }));

      set_estaciones(new_estacion);
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };

  useEffect(() => {
    void estacion();
  }, []);

  const traer_dato = async (data: {
    estacion: { value: number };
  }): Promise<any> => {
    try {
      const estacion_id = data.estacion?.value;
      const estacion = await consultar_datos_id(estacion_id)
        .then((res: Datos[]) => {
          //  console.log('')('DATOS', res[res.length - 1]);
          return res[res.length - 1];
        })
        .catch((err: AxiosError) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (err?.response) {
            if (err.response.status === 404) {
              if (estacion_id === 5 || estacion_id === 6) {
                control_error(
                  'La estación no se puede eliminar porque contiene datos'
                );
                return;
              }
              confirmar_eliminar_usuario(estacion_id);
            }
          }
          throw err;
        });
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (estacion) {
        control_error('La estación no se puede eliminar porque contiene datos');
      }

      set_dato(estacion); // guardar el valor en el estado
    } catch (err: any) {
      const temp_error = err as AxiosError;
      //  console.log('')('Error', temp_error.response?.status);
      if (temp_error.response?.status === 404) {
        control_error('No se encontraron datos para esta estación');
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
      }
    }
  };
  const confirmar_eliminar_usuario = (id_Estacion: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminar_estacion(id_Estacion);
        void estacion();
        control_success('La estación se eliminó correctamente');
      }
    });
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        mt: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <style>
        {`
          .square-btn {
            border-radius: 0 !important;
          }

          .swal2-icon.swal2-warning {
            font-size: 14px !important;
          }
        `}
      </style>
      <Title title="Estaciones hidrometeorológicas"></Title>
      <Grid item xs={12}>
        <Button
          sx={{ mb: '20px' }}
          variant="outlined"
          onClick={handle_open_crear_estacion}
          startIcon={<AddIcon />}
        >
          CREAR ESTACIÓN
        </Button>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        {list_estaciones.length > 0 ? (
          <>
            <Grid item xs={12}>
              <ButtonGroup
                style={{
                  margin: 7,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {download_xls({ nurseries: list_estaciones, columns })}
                {download_pdf({
                  nurseries: list_estaciones,
                  columns,
                  title: '  CREAR ESTACIÓN',
                })}
              </ButtonGroup>
              <DataGrid
                autoHeight
                rows={list_estaciones}
                columns={columns}
                getRowId={(row) => row.id_estacion}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </Grid>
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Grid>
      <CrearEstacionDialog
        is_modal_active={crear_estacion_is_active}
        set_is_modal_active={set_crear_estacion_is_active}
        estacion={estacion}
      />
      <EditarEstacionDialog
        is_modal_active={editar_estacion_is_active}
        set_is_modal_active={set_editar_estacion_is_active}
        estacion_editado={estacion_editado}
        set_estacion_editado={set_estacion_editado}
        estacion={estacion}
      />
    </Grid>
  );
};
