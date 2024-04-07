/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Box,
  Button,
  Stack,
  FormHelperText,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Title } from '../../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../../../../../hooks';
import { control_error } from '../../../../../helpers';
import { get_tipo_documento } from '../../../../../request';
import { useNavigate } from 'react-router-dom';
import { BuscadorPersonaDialog } from '../../../../almacen/gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog';
import {
  obtener_persona,
  vincular_colaborador,
  obtener_cargos,
  obtener_unidades_org,
  desvincular_colaborador,
  actualizar_vinculo,
} from '../Thunks/VinculacionColaboradores';
import CargoUnidadOrganizacionalComponent from './CargoUnidadOrganizacional';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CreateIcon from '@mui/icons-material/Create';
import { consultar_vinculacion_persona } from '../../../request/Request';
import { ModalVinculacionesAnteriores } from '../components/ModalVinculacionesAnteriores';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VinculacionColaboradoresScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user_info, set_user_info] = useState<any>({});
  const [persona, set_persona] = useState<any | null>(null);
  const [abrir_modal_persona, set_abrir_modal_persona] =
    useState<boolean>(false);
  const [modal_vincular_persona, set_modal_vincular_persona] =
    useState<boolean>(false);
  const [tipos_documentos, set_tipos_documentos] = useState<any>([]);
  const [tipo_documento, set_tipo_documento] = useState<string>('');
  const [msj_error_tdoc, set_msj_error_tdoc] = useState<string>('');
  const [nro_documento, set_nro_documento] = useState<string>('');
  const [msj_error_nro_documento, set_msj_error_nro_documento] =
    useState<string>('');
  const [nombre_completo, set_nombre_completo] = useState<string>('');
  const [vinculacion, set_vinculacion] = useState<any | null>(null);
  const [persona_vinculacion, set_persona_vinculacion] = useState<any | null>(
    null
  );
  const [persona_vinculacion_tkx, set_persona_vinculacion_tkx] = useState<
    any | null
  >(null);
  const [cargo_actual, set_cargo_actual] = useState<string>('');
  const [msj_error_cargo_actual, set_msj_error_cargo_actual] =
    useState<string>('');
  const [unidad_org, set_unidad_org] = useState<string>('');
  const [msj_error_unidad_org, set_msj_error_unidad_org] = useState<string>('');
  const [fecha_inicio, set_fecha_inicio] = useState<string>('');
  const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] =
    useState<string>('');
  const [fecha_asig, set_fecha_asig] = useState<string>('');
  const [msj_error_fecha_asig, set_msj_error_fecha_asig] = useState<string>('');
  const [fecha_finaliza, set_fecha_finaliza] = useState<string>('');
  const [msj_error_fecha_finaliza, set_msj_error_fecha_finaliza] =
    useState<string>('');
  const [obs_vin_cargo, set_obs_vin_cargo] = useState<string>('');
  const [msj_error_obs_vin_cargo, set_msj_error_obs_vin_cargo] =
    useState<string>('');
  const [tipos_cargos, set_tipos_cargos] = useState<any[]>([]);
  const [lista_unidad_org, set_lista_unidad_org] = useState<any[]>([]);
  const [update_vinculo, set_update_vinculo] = useState<boolean>(false);
  const [modal_vinculaciones_anteriores, set_modal_vinculaciones_anteriores] =
    useState(false);

  useEffect(() => {
    void get_list_tipo_doc();
    obtener_usuario();
    obtener_cargos_fc();
    obtener_unidades_org_fc();
  }, []);

  useEffect(() => {
    if (tipo_documento !== '' && nro_documento !== '') {
      buscar_persona(tipo_documento, nro_documento);
    }
  }, [tipo_documento, nro_documento]);

  useEffect(() => {
    if (persona !== null && persona !== undefined) {
      set_tipo_documento(persona.tipo_documento);
      set_nro_documento(persona.numero_documento);
      set_nombre_completo(persona.nombre_completo);
      void get_datos_vinculación();
    } else {
      set_nombre_completo('');
    }
  }, [persona]);

  useEffect(() => {
    if (vinculacion !== null && vinculacion !== undefined) {
      set_cargo_actual(vinculacion.cargo_desc);
      set_fecha_inicio(vinculacion.fecha_inicio.format('DD-MM-YYYY'));
      set_fecha_finaliza(vinculacion.fecha_finaliza.format('DD-MM-YYYY'));
      set_obs_vin_cargo(vinculacion.obs_vin_cargo);
      set_unidad_org(vinculacion.unidad_org_desc);
      set_fecha_asig(vinculacion.fecha_asignacion.format('DD-MM-YYYY'));
      set_persona_vinculacion(vinculacion);
    }
  }, [vinculacion]);

  useEffect(() => {
    if (
      persona_vinculacion_tkx !== null &&
      persona_vinculacion_tkx !== undefined
    ) {
      set_cargo_actual(persona_vinculacion_tkx.cargo_actual);
      set_fecha_inicio(
        dayjs(persona_vinculacion_tkx.fecha_inicio_cargo_actual).format(
          'DD-MM-YYYY'
        )
      );
      set_fecha_finaliza(
        dayjs(persona_vinculacion_tkx.fecha_a_finalizar_cargo_actual).format(
          'DD-MM-YYYY'
        )
      );
      set_obs_vin_cargo(
        persona_vinculacion_tkx.observaciones_vinculacion_cargo_actual
      );
      set_unidad_org(persona_vinculacion_tkx.unidad_organizacional_actual);
      set_fecha_asig(
        dayjs(persona_vinculacion_tkx.fecha_asignacion_unidad).format(
          'DD-MM-YYYY'
        )
      );
      const formulario_cargo_unidad: any = {
        cargo: 0,
        cargo_actual: persona_vinculacion_tkx.cargo_actual,
        fecha_inicio: dayjs(persona_vinculacion_tkx.fecha_inicio_cargo_actual),
        fecha_finaliza: dayjs(
          persona_vinculacion_tkx.fecha_a_finalizar_cargo_actual
        ),
        obs_vin_cargo:
          persona_vinculacion_tkx.observaciones_vinculacion_cargo_actual,
        unidad_organizacional: 0,
        unidad_org_desc: persona_vinculacion_tkx.unidad_organizacional_actual,
        fecha_asignacion: dayjs(
          persona_vinculacion_tkx.fecha_asignacion_unidad
        ),
        justificacion: '',
        desvincular: false,
        fecha_desvinculacion: dayjs(),
        obs_desvincula: '',
      };
      set_persona_vinculacion(formulario_cargo_unidad);
    }
  }, [persona_vinculacion_tkx]);

  // trae los datos de vinculacion de una persona
  const get_datos_vinculación = async (): Promise<void> => {
    set_persona_vinculacion_tkx(null);
    if (persona.id_persona !== null && persona.id_persona !== undefined) {
      try {
        const response = await consultar_vinculacion_persona(
          persona.id_persona
        );
        set_persona_vinculacion_tkx(response);
        set_update_vinculo(true);
      } catch (error) {
        //  console.log('')(error);
      }
    }
  };

  const obtener_cargos_fc = (): void => {
    dispatch(obtener_cargos()).then(
      (response: { success: boolean; detail: string; data: any }) => {
        if (response.success) {
          const data_filter = response.data.filter((rd: any) => rd.activo);
          set_tipos_cargos(data_filter);
        }
      }
    );
  };

  const obtener_unidades_org_fc = (): void => {
    dispatch(obtener_unidades_org()).then(
      (response: { success: boolean; data: any }) => {
        if (response.success) set_lista_unidad_org(response.data);
      }
    );
  };

  const obtener_usuario: () => void = () => {
    const data = sessionStorage.getItem('persist:macarenia_app');
    if (data !== null) {
      const data_json = JSON.parse(data);
      const data_auth = JSON.parse(data_json.auth);
      set_user_info(data_auth.userinfo);
    }
    //  console.log('')(user_info);
  };

  const get_list_tipo_doc = async (): Promise<void> => {
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipos_documentos(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    }
  };

  const cambio_tipo_documento: (event: SelectChangeEvent) => void = (
    e: SelectChangeEvent
  ) => {
    set_tipo_documento(e.target.value);
    if (e.target.value !== null && e.target.value !== '')
      set_msj_error_tdoc('');
  };

  const cambio_nro_documento: any = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      e.target.value !== null &&
      e.target.value !== undefined &&
      e.target.value !== ''
    ) {
      set_nro_documento(e.target.value);
      set_msj_error_nro_documento('');
    }
  };

  const buscar_persona = (tipo_doc: string, nro_doc: string): void => {
    dispatch(obtener_persona(tipo_doc, nro_doc)).then(
      (response: { success: boolean; detail: string; data: any }) => {
        if (response.success && response.data !== undefined) {
          set_persona(response.data);
        } else {
          set_persona(null);
        }
      }
    );
  };

  const guardar_vinculacion = (): void => {
    if (vinculacion.desvincular === true) {
      dispatch(
        desvincular_colaborador(persona.id_persona, {
          observaciones_desvinculacion: persona_vinculacion.obs_desvincula,
        })
      ).then(() => {
        limpiar_formulario();
      });
      return;
    }
    const formulario: any = {
      id_cargo: vinculacion.cargo,
      id_unidad_organizacional_actual: vinculacion.unidad_organizacional,
      fecha_a_finalizar_cargo_actual:
        vinculacion.fecha_finaliza.format('YYYY-MM-DD'),
      observaciones_vinculacion_cargo_actual: obs_vin_cargo,
      justificacion_cambio_und_org: persona_vinculacion.justificacion,
      fecha_inicio_cargo_actual: vinculacion.fecha_inicio.format('YYYY-MM-DD'),
    };
    if (update_vinculo && vinculacion.desvincular === false) {
      dispatch(actualizar_vinculo(persona.id_persona, formulario)).then(() => {
        limpiar_formulario();
      });
      return;
    }
    if (
      valida_formulario() &&
      persona.id_persona !== null &&
      persona.id_persona !== undefined
    ) {
      dispatch(vincular_colaborador(persona.id_persona, formulario)).then(
        () => {
          limpiar_formulario();
        }
      );
    }
  };

  const salir: () => void = () => {
    navigate('/home');
  };

  const valida_formulario = (): boolean => {
    let validador = true;
    if (cargo_actual === '') {
      set_msj_error_cargo_actual('El campo Cargo es obligatorio.');
      validador = false;
    }
    if (fecha_inicio === '') {
      set_msj_error_fecha_finaliza('El campo Fecha inicio es obligatorio.');
      validador = false;
    }
    if (fecha_finaliza === '') {
      set_msj_error_fecha_finaliza(
        'El campo Fecha a finalizar es obligatorio.'
      );
      validador = false;
    }
    if (fecha_asig === '') {
      set_msj_error_fecha_finaliza('El campo Fecha asignaciòn es obligatorio.');
      validador = false;
    }
    if (obs_vin_cargo === '') {
      set_msj_error_obs_vin_cargo(
        'El campo Observación de la vinculación al cargo es obligatorio.'
      );
      validador = false;
    }
    if (unidad_org === '') {
      set_msj_error_unidad_org(
        'El campo Unidad orgranizacional nueva es obligatorio.'
      );
      validador = false;
    }
    return validador;
  };

  const limpiar_formulario = (): void => {
    set_persona(null);
    set_tipo_documento('');
    set_msj_error_tdoc('');
    set_nro_documento('');
    set_msj_error_nro_documento('');
    set_nombre_completo('');
    set_vinculacion(null);
    set_persona_vinculacion(null);
    set_persona_vinculacion_tkx(null);
    set_cargo_actual('');
    set_msj_error_cargo_actual('');
    set_unidad_org('');
    set_msj_error_unidad_org('');
    set_fecha_inicio('');
    set_msj_error_fecha_inicio('');
    set_fecha_asig('');
    set_msj_error_fecha_asig('');
    set_fecha_finaliza('');
    set_msj_error_fecha_finaliza('');
    set_obs_vin_cargo('');
    set_msj_error_obs_vin_cargo('');
    set_update_vinculo(false);
  };

  return (
    <>
      {/* <h1>Registrar candidato a colaborador</h1> */}
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item md={12} xs={12}>
          <Title title="Datos de identificación" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl required size="small" fullWidth>
                  <InputLabel>Tipo de documento</InputLabel>
                  <Select
                    value={tipo_documento}
                    label="Tipo de documento"
                    onChange={cambio_tipo_documento}
                    error={msj_error_tdoc !== ''}
                  >
                    {tipos_documentos.map((tipos: any) => (
                      <MenuItem key={tipos.value} value={tipos.value}>
                        {tipos.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {msj_error_tdoc !== '' && (
                  <FormHelperText error>{msj_error_tdoc}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Numero documento"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nro_documento}
                  onChange={cambio_nro_documento}
                  error={msj_error_nro_documento !== ''}
                />
                {msj_error_nro_documento !== '' && (
                  <FormHelperText error>
                    {msj_error_nro_documento}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nombre"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={nombre_completo ?? ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={() => {
                    set_abrir_modal_persona(true);
                  }}
                >
                  Buscar persona
                </Button>
                {abrir_modal_persona && (
                  <BuscadorPersonaDialog
                    is_modal_active={abrir_modal_persona}
                    set_is_modal_active={set_abrir_modal_persona}
                    title={'Busqueda de proveedor'}
                    set_persona={set_persona}
                  />
                )}
              </Grid>
            </Grid>
          </Box>

          {!persona || !persona?.id_persona ? (
            <></>
          ) : (
            <Box
              component="form"
              sx={{ mt: '20px' }}
              noValidate
              autoComplete="off"
            >
              <Grid item container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    sx={{ mt: '20px' }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<ManageSearchIcon />}
                      onClick={() => {
                        set_modal_vinculaciones_anteriores(true);
                      }}
                    >
                      Ver vinculaciones anteriores
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item md={12} xs={12}>
          <Title title="Cargo y unidad organizacional actual" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Cargo actual"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={cargo_actual}
                  InputProps={{
                    readOnly: true,
                  }}
                  error={msj_error_cargo_actual !== ''}
                />
                {msj_error_cargo_actual !== '' && (
                  <FormHelperText error>
                    {msj_error_cargo_actual}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Unidad organizacional"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={unidad_org}
                  InputProps={{
                    readOnly: true,
                  }}
                  error={msj_error_unidad_org !== ''}
                />
                {msj_error_unidad_org !== '' && (
                  <FormHelperText error>{msj_error_unidad_org}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Fecha inicio"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={fecha_inicio}
                  InputProps={{
                    readOnly: true,
                  }}
                  error={msj_error_fecha_inicio !== ''}
                />
                {msj_error_fecha_inicio !== '' && (
                  <FormHelperText error>
                    {msj_error_fecha_inicio}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Fecha asignación"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={fecha_asig}
                  InputProps={{
                    readOnly: true,
                  }}
                  error={msj_error_fecha_asig !== ''}
                />
                {msj_error_fecha_asig !== '' && (
                  <FormHelperText error>{msj_error_fecha_asig}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Fecha a finalizar"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={fecha_finaliza}
                  InputProps={{
                    readOnly: true,
                  }}
                  error={msj_error_fecha_finaliza !== ''}
                />
                {msj_error_fecha_finaliza !== '' && (
                  <FormHelperText error>
                    {msj_error_fecha_finaliza}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<CreateIcon />}
                  onClick={() => {
                    set_modal_vincular_persona(true);
                  }}
                >
                  Vincular
                </Button>
                {modal_vincular_persona && (
                  <CargoUnidadOrganizacionalComponent
                    is_modal_active={modal_vincular_persona}
                    set_is_modal_active={set_modal_vincular_persona}
                    title={'Asignar/Cambiar cargo y unidad organizacional'}
                    persona_vinculacion={persona_vinculacion}
                    vinculacion={set_vinculacion}
                    tipos_cargos={tipos_cargos}
                    lista_unidad_org={lista_unidad_org}
                  ></CargoUnidadOrganizacionalComponent>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={2}
                  value={obs_vin_cargo}
                  label="Observación de la vinculación al cargo"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  error={msj_error_obs_vin_cargo !== ''}
                />
                {msj_error_obs_vin_cargo !== '' && (
                  <FormHelperText error>
                    {msj_error_obs_vin_cargo}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>{' '}
        <Grid container justifyContent="flex-end">
          <Grid item xs={6}>
            <Box
              component="form"
              sx={{ mt: '20px', mb: '20px' }}
              noValidate
              autoComplete="off"
            >
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{ mt: '20px' }}
              >
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={guardar_vinculacion}
                >
                  {update_vinculo ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={salir}
                >
                  Salir
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/*Modal para ver las vinculaciones anteriores*/}
      <ModalVinculacionesAnteriores
        nombre_completo={persona?.nombre_completo ?? ''}
        id_persona={persona?.id_persona ?? 0}
        set_modal_vinculaciones_anteriores={set_modal_vinculaciones_anteriores}
        modal_vinculaciones_anteriores={modal_vinculaciones_anteriores}
      />
      {/*Modal para ver las vinculaciones anteriores*/}
    </>
  );
};
