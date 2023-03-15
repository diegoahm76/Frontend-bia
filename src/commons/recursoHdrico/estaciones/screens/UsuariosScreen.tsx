/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Box, Stack, Button, FormControl, InputLabel, FormHelperText } from '@mui/material';
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
import { type Estaciones, type Persona } from '../interfaces/interfaces';
import { consultar_estaciones, consultar_estaciones_id, eliminarUsuario } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { Title } from '../../../../components/Title';
import { NuevoUsuarioModal } from '../components/NuevoUsuarioModal';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UsuariosScreen: React.FC = () => {
  const [crear_persona_is_active, set_crear_persona_is_active] = useState<boolean>(false);
  const [is_modal_editar_active, set_is_modal_editar_active] = useState(false);
  const [estaciones_options, set_estaciones_options] = useState([]);
  const [loading, set_loading] = useState(false);
  const [estaciones_meteologicas, set_estaciones_meteologicas] = useState<Persona[]>([]);
  const [data_reportes, set_data_reportes] = useState<Estaciones[]>([]);

  const handle_open_crear_persona = () => {
    set_crear_persona_is_active(true);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const columnDefs: GridColDef[] = [
    {
      headerName: "Estacion",
      field: "nombre_estacion",
      minWidth: 140,
      editable: true,
    },
    {
      headerName: "Tipo de documento",
      field: "cod_tipo_documento_id",
      minWidth: 140,
      editable: true,
    },
    {
      headerName: "Identificacion",
      field: "numero_documento_id",
      minWidth: 140,
      editable: true,
    },
    { headerName: "Primer Nombre", field: "primer_nombre", minWidth: 140 },
    { headerName: "Primer Apellido", field: "primer_apellido", minWidth: 140 },
    { headerName: "Entidad", field: "entidad", minWidth: 140 },
    { headerName: "Cargo", field: "cargo", minWidth: 140 },
    { headerName: "Email", field: "email_notificacion", minWidth: 140 },
    { headerName: "Celular", field: "nro_celular_notificacion", minWidth: 140 },
    { headerName: "Observacion", field: "observacion", minWidth: 140 },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      renderCell: (params) => (
        <div className="d-flex gap-1">
          <IconButton
            size="small"
            className="btn-tablas"
            onClick={() => {
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


  const get_data_initial = async () => {
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
    } catch (err) {
      control_error(err);
      set_loading(false);
    }
  };

  const {
    formState: { errors },
  } = useForm();

  const confirmar_eliminar_usuario = (idPersona: number) => {
    void Swal.fire({
      title: "Estas seguro?",
      text: "Va a eliminar un usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        void eliminarUsuario(idPersona);
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
          <form className="row" onSubmit={handle_submit_filtrar(on_submit_filtrar)}>
            {/* <form className='row'> */}
            <Grid item xs={12} sm={4}>
              <Stack sx={{ m: '20px 0' }} direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>
                    <span style={{ color: "red" }}></span>
                  </InputLabel>
                  <Controller
                    name="estacion"
                    control={control_filtrar}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={estaciones_options}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {(errors_filtrar.estacion != null) && (
                    <FormHelperText error>
                      Seleccione una estación para continuar

                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  className="text-capitalize rounded-pill  "
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <SearchIcon />
                    )
                  }
                >
                  {loading ? "Cargando..." : ""}
                </Button>
              </Stack>
            </Grid>
          </form>
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
                }}
              >
                <Title title="INFORMACIÓN GENERAL"></Title>
              </Grid>
              <Button
                variant="outlined"
                sx={{ m: '20px 0' }}
                onClick={handle_open_crear_persona}
                startIcon={<AddIcon />}
              >
                Agregar
              </Button>
              <Grid item>
                <Box>
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={estaciones_meteologicas}
                    columns={columnDefs}
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
      />
      {/* {<EditarUsuarioModal
      set_is_modal_active={set_is_modal_editar_active}
      is_modal_active={is_modal_editar_active}
    />} */}
    </>
  )
};
