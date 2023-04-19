/* eslint-disable @typescript-eslint/no-misused-promises */
import { Grid, Box, Stack, Button, FormControl, FormHelperText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Select from "react-select";
import type {
  GridColDef,
} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { api } from '../../../../api/axios';
import { type Persona } from '../interfaces/interfaces';
import { consultar_estaciones_id, control_success, eliminar_usuario } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { Title } from '../../../../components/Title';
import { NuevoUsuarioModal } from '../components/NuevaPersonaDialog';
import { EditarPersonaDialog } from '../components/EditarPersonaDialog';
import type { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UsuariosScreen: React.FC = () => {
  const [crear_persona_is_active, set_crear_persona_is_active] = useState<boolean>(false);
  const [is_modal_editar_active, set_is_modal_editar_active] = useState(false);
  const [estaciones_options, set_estaciones_options] = useState<any[]>([]);
  const [loading, set_loading] = useState(false);
  const [estaciones_meteologicas, set_estaciones_meteologicas] = useState<Persona[]>([]);
  const [usuario_editado, set_usuario_editado] = useState(null);

  // const [data_reportes, set_data_reportes] = useState<Estaciones[]>([]);

  const handle_open_crear_persona = (): void => {
    set_crear_persona_is_active(true);
  }

  const columns: GridColDef[] = [
    {
      headerName: "ESTACIÓN",
      field: "nombre_estacion",
      minWidth: 140,
      editable: true,
    },
    {
      headerName: "TIPO DOC.",
      field: "cod_tipo_documento_id",
      minWidth: 140,
      editable: true,
    },
    {
      headerName: "IDENTIFICACIÓN",
      field: "numero_documento_id",
      minWidth: 140,
      editable: true,
    },
    { headerName: "PRIMER NOMBRE", field: "primer_nombre", minWidth: 140 },
    { headerName: "PRIMER APELLIDO", field: "primer_apellido", minWidth: 140 },
    { headerName: "ENTIDAD", field: "entidad", minWidth: 140 },
    { headerName: "CARGO", field: "cargo", minWidth: 140 },
    { headerName: "EMAIL", field: "email_notificacion", minWidth: 140 },
    { headerName: "CELULAR", field: "nro_celular_notificacion", minWidth: 140 },
    { headerName: "OBSERVACIÓN", field: "observacion", minWidth: 140 },
    {
      headerName: "ACCIONES",
      field: "acciones",
      minWidth: 140,
      renderCell: (params) => (
        <div className="d-flex gap-1">
          <IconButton
            size="small"
            className="btn-tablas"
            onClick={() => {
              set_usuario_editado(params.row);
              set_is_modal_editar_active(!is_modal_editar_active);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            className="btn-tablas"
            onClick={() => { confirmar_eliminar_usuario(params.row.id_persona); }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];


  const {
    handleSubmit: handle_submit_filtrar,
    control: control_filtrar,
    formState: { errors: errors_filtrar },
  } = useForm();


  const get_data_initial = async (): Promise<void> => {
    try {
      set_loading(true);
      const { data } = await api.get('/estaciones/consultar-estaciones/');
      const estaciones_maped = data.data.map((estacion: { nombre_estacion: string; id_estacion: number | string; }) => ({
        label: estacion.nombre_estacion,
        value: estacion.id_estacion,
      }));
      set_estaciones_options(estaciones_maped);
      set_loading(false);
    } catch (err) {
      control_error(err);
      set_loading(false);
    }
  };

  useEffect(() => {
    void get_data_initial();
  }, []);

  const on_submit_filtrar: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_loading(true);
      set_estaciones_meteologicas([])
      const estacion_id = data.estacion?.value;
      const estacion = await consultar_estaciones_id(estacion_id);
      const personas = estacion.personas.map((persona) => ({
        id_estacion: estacion.id_estacion,
        nombre_estacion: estacion.nombre_estacion,
        id_persona: persona.id_persona,
        cod_tipo_documento_id: persona.cod_tipo_documento_id,
        numero_documento_id: persona.numero_documento_id,
        primer_nombre: persona.primer_nombre,
        segundo_nombre: persona.segundo_nombre,
        primer_apellido: persona.primer_apellido,
        segundo_apellido: persona.segundo_apellido,
        entidad: persona.entidad,
        cargo: persona.cargo,
        email_notificacion: persona.email_notificacion,
        nro_celular_notificacion: persona.nro_celular_notificacion,
        observacion: persona.observacion,
      }));
      set_estaciones_meteologicas(personas);
      set_loading(false);
    } catch (err: unknown) {
      const temp_error = err as AxiosError
      console.log("Error", temp_error.response?.status)
      if (temp_error.response?.status === 500) {
        set_loading(false);
        return ""
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
      }
    };
  };

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm();

  const confirmar_eliminar_usuario = (idPersona: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: "square-btn",
        cancelButton: "square-btn",
      },
      width: 350,
      text: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8BC34A",
      cancelButtonColor: "#B71C1C",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminar_usuario(idPersona);
        on_submit_filtrar(estaciones_options.map((estacion) => estacion.value))
        control_success('La persona se eliminó correctamente')
      }
    });
  };

  return (
    <>
      <Grid container spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}>
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
        <Grid item xs={12}>
          <Grid
            item
            className={`border px-4 text-white fs-5 p-1`}
            sx={{
              display: 'grid',
              background:
                'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
              width: '100%',
              height: '40px',

              borderRadius: '10px',
              pl: '20px',
              fontSize: '17px',
              fontWeight: 'bold',
              alignContent: 'center',
            }}
          >
            <Title title="PARTES INTERESADAS"></Title>
          </Grid>
          <Typography sx={{ mt: '10px' }}>
            Estación:
          </Typography>
          <Box component="form" onSubmit={handle_submit_filtrar(on_submit_filtrar)}>
            <Grid item xs={12}>
              <Stack sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>

                <FormControl fullWidth>
                  <Controller
                    name="estacion"
                    control={control_filtrar}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={estaciones_options}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors_filtrar.estacion != null && (
                    <FormHelperText error>
                      Seleccione una estación para continuar
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    className="search-button text-capitalize rounded-pill"
                    startIcon={
                      loading
                        ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                        : <SearchIcon />
                    }
                    aria-label="Buscar "
                    size="large"
                  >
                    Buscar
                    {loading ? '' : ""}
                  </Button>
                </FormControl>
                <FormControl fullWidth>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handle_open_crear_persona}
                    startIcon={<AddIcon />}
                  >
                    Agregar
                  </Button>
                </FormControl>
              </Stack>
            </Grid>
          </Box>
          {estaciones_meteologicas.length > 0 && (
            <>
              <Grid
                item

                className={`border px-4 text-white fs-5 p-1`}
                sx={{
                  display: 'grid',
                  background:
                    'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
                  width: '100%',
                  height: '40px',

                  borderRadius: '10px',
                  pl: '20px',
                  fontSize: '17px',
                  fontWeight: 'bold',
                  alignContent: 'center',
                }} spacing={2}
              >
                <Title title="INFORMACIÓN GENERAL"></Title>
              </Grid>
              <Grid item>
                <Box>
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={estaciones_meteologicas}
                    columns={columns}
                    getRowId={(row) => row.id_persona}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <NuevoUsuarioModal
        is_modal_active={crear_persona_is_active}
        set_is_modal_active={set_crear_persona_is_active}
        persona={on_submit_filtrar}
      />
      {<EditarPersonaDialog
        set_is_modal_active={set_is_modal_editar_active}
        is_modal_active={is_modal_editar_active}
        usuario_editado={usuario_editado}
        set_usuario_editado={set_usuario_editado}
        persona={on_submit_filtrar}
        estaciones_options={estaciones_options}
      />}
    </>
  )
};
