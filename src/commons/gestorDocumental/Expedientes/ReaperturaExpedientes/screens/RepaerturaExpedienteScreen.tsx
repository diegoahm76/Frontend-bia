import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Box,
  Button,
  FilledTextFieldProps,
  Grid,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
  TextFieldVariants,
  Tooltip,
} from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import FormInputController from '../../../../../components/partials/form/FormInputController';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import FormDatePickerController from '../../../../../components/partials/form/FormDatePickerController';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  IObjReaperturaExpediente,
  IObjExpedientes,
  IObjArchivoExpediente,
  IObjInformacionReapertura,
} from '../../cierreExpediente/interfaces/cierreExpedientes';
import BuscarExpedienteReapertura from '../components/BuscarExpedienteReapertura';
import ArchivoSoporteReapertura from '../components/archivoSoporteReapertura';
import {
  delete_file,
  get_archivos_id_expediente,
  get_informacion_reapertura,
  reapertura_expediente,
} from '../../cierreExpediente/store/thunks/cierreExpedientesthunks';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { JSX } from 'react/jsx-runtime';
import {
  initial_state_current_archivo_expediente,
  set_current_archivo_expediente,
} from '../../cierreExpediente/store/slice/indexCierreExpedientes';
import { control_error } from '../../../../../helpers';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ReaperturaExpedienteScreen = () => {
  const {
    current_archivo_expediente,
    archivos_por_expedientes,
    informacion_reapertura,
  } = useAppSelector((state) => state.cierre_expedientes);

  const {
    control: control_reapertura_expediente,
    getValues: get_values,
    reset: reset_reapertura_expediente,
    handleSubmit: handle_reapertura_expediente,
  } = useForm<IObjReaperturaExpediente>();

  const {
    control: control_archivo_expediente,
    getValues: get_values_archivo,
    handleSubmit: handle_submit_archivo,
    reset: reset_archivo_expediente,
  } = useForm<IObjArchivoExpediente>();

  const { control: control_informacion, reset: reset_informacion } =
    useForm<IObjInformacionReapertura>();

  const [open_modal, set_open_modal] = useState(false);
  const [open_modal_archivo, set_open_modal_archivo] = useState(false);
  const [selected_expediente, set_selected_expediente] =
    useState<IObjExpedientes>();
  const [selected_archivo_soporte, set_selected_archivo_soporte] =
    useState<IObjArchivoExpediente>();
  const dispatch = useAppDispatch();

  const handle_buscar_reapertura = () => {
    set_open_modal(true);
  };
  const handle_close_buscar_reapertura = () => {
    set_open_modal(false);
  };

  const handle_adjuntar_archivo = () => {
    set_open_modal_archivo(true);
    dispatch(
      set_current_archivo_expediente(initial_state_current_archivo_expediente)
    );
  };
  const handle_close_adjuntar_archivo = () => {
    set_open_modal_archivo(false);
  };

  useEffect(() => {
    reset_archivo_expediente(current_archivo_expediente);
  }, [current_archivo_expediente]);

  const handle_selected_expediente = (
    expediente_reapertura: IObjExpedientes
  ) => {
    set_selected_expediente(expediente_reapertura);
  };

  useEffect(() => {
    //  console.log('')(selected_expediente)
    reset_reapertura_expediente(selected_expediente);
  }, [selected_expediente]);

  const handle_selected_arrchivo_expediente = (
    archivo: IObjArchivoExpediente
  ) => {
    dispatch(set_current_archivo_expediente(archivo));
    set_open_modal_archivo(true);
  };

  useEffect(() => {
    //  console.log('')(selected_archivo_soporte)
    reset_archivo_expediente(selected_archivo_soporte);
  }, [selected_archivo_soporte]);

  useEffect(() => {
    if (
      selected_expediente &&
      typeof selected_expediente.id_expediente_documental === 'number'
    ) {
      //  console.log('')(selected_expediente);
      reset_reapertura_expediente(selected_expediente);
      void dispatch(
        get_archivos_id_expediente(selected_expediente.id_expediente_documental)
      );
      void dispatch(
        get_informacion_reapertura(selected_expediente.id_expediente_documental)
      );
    }
  }, [selected_expediente]);

  useEffect(() => {
    reset_informacion(informacion_reapertura);
  }, [informacion_reapertura]);

  const columns: GridColDef[] = [
    {
      field: 'orden_en_expediente',
      headerName: 'ÓRDEN AGREGADO',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_asignado_documento',
      headerName: 'NOMBRE ASIGNADO',
      sortable: true,
      width: 350,
    },
    {
      field: 'nombre_tipologia',
      headerName: 'TIPOLOGÍA',
      width: 350,
    },
    {
      field: 'Editar',
      headerName: 'EDITAR',
      width: 100,
      renderCell: (params) => (
        <Tooltip title="Editar">
          <Button
            onClick={() => handle_selected_arrchivo_expediente(params.row)}
            startIcon={<PlaylistAddCheckIcon />}
          ></Button>
        </Tooltip>
      ),
    },
    {
      field: 'acciones',
      headerName: 'ELIMINAR',
      width: 100,
      renderCell: (params) => (
        <>

          <Tooltip title="Eliminar">
            <Button
              aria-label="delete"
              size="small"
              onClick={() => {
                console.log(params.row)
                if (
                  current_archivo_expediente.id_expediente_documental !==
                    undefined &&
                  current_archivo_expediente.id_expediente_documental !== null
                ) {
                  dispatch(
                    delete_file(
                      params.row.id_documento_de_archivo_exped,
                      current_archivo_expediente.id_expediente_documental
                    )
                  );
                }
              }}
            >
              <DeleteIcon
                titleAccess="Eliminar"
                sx={{
                  color: 'red',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const on_submit_reapertura_expediente = (
    data: IObjReaperturaExpediente
  ): void => {

    if (archivos_por_expedientes.length === 0) {
      control_error(
        'No se puede realizar la reapertura del expediente, no se han agregado archivos de soporte'
      );
      return;
    }

    if (
      selected_expediente &&
      typeof selected_expediente.id_expediente_documental === 'number'
    ) {
      const data_cerrar = {
        ...data,
        id_expediente_doc: selected_expediente.id_expediente_documental,
      };

      void dispatch(reapertura_expediente(data_cerrar));
    }
  };

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Title title="REAPERTURA DE EXPEDIENTES" />
        <FormInputController
          xs={12}
          md={4}
          margin={0}
          control_form={control_archivo_expediente}
          control_name="titulo_expediente"
          default_value=""
          rules={{}}
          type="text"
          disabled={true}
          helper_text=""
          hidden_text={null}
          label={'Expediente Cerrado'}
        />

        <Grid item xs={12} sm={4}>
          <LoadingButton
            variant="contained"
            onClick={handle_buscar_reapertura}
            disabled={false}
          >
            Buscar
          </LoadingButton>
        </Grid>

        <FormDatePickerController
          xs={12}
          md={3.5}
          control_form={control_archivo_expediente}
          control_name={'fecha_actual'}
          default_value={''}
          rules={{}}
          label={'Fecha de creación Documento'}
          disabled={false}
          format={'YYYY-MM-DD'}
          helper_text={''}
        />

        {open_modal && (
          <Grid item xs={12} marginY={1}>
            <BuscarExpedienteReapertura
              control_reapertura_expediente={control_reapertura_expediente}
              open={open_modal}
              handle_close_buscar_reapertura={handle_close_buscar_reapertura}
              get_values={get_values}
              handle_selected_expediente={handle_selected_expediente}
            />
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        {selected_expediente?.id_expediente_documental && (
          <Grid item xs={12} sm={8} marginTop={3}>
            <Controller
              name="nombre_persona_cierra"
              control={control_informacion}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  disabled={true}
                  defaultValue={value}
                  value={value}
                  onChange={onChange}
                  error={!(error == null)}
                  sx={{
                    backgroundColor: 'white',
                  }}
                ></TextField>
              )}
            />
          </Grid>
        )}
        {selected_expediente?.id_expediente_documental && (
          <Grid item xs={12} sm={8}>
            <Typography variant="body1">Observación del Cierre</Typography>
            <Controller
              name="cierre_expediente.justificacion_cierre_reapertura"
              control={control_informacion}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  fullWidth
                  multiline
                  rows={2}
                  disabled={true}
                  variant="outlined"
                  defaultValue={value}
                  value={value}
                  onChange={onChange}
                  error={!(error == null)}
                  sx={{
                    backgroundColor: 'white',
                  }}
                ></TextField>
              )}
            />
          </Grid>
        )}
        {selected_expediente?.id_expediente_documental && (
          <Grid item xs={12} sm={6} margin={2}>
            <label
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
              }}
            >
              <small
                style={{
                  color: 'black',
                  fontSize: '1rem',
                }}
              >
                ARCHIVOS DE SOPORTE
              </small>
            </label>
          </Grid>
        )}

        {selected_expediente?.id_expediente_documental && (
          <Box sx={{ width: '70%' }}>
            <Title title="RESULTADOS DE LA BÚSQUEDA" />
            <>
              <DataGrid
                density="compact"
                autoHeight
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                rows={archivos_por_expedientes}
                getRowId={(row) => row.orden_en_expediente}
              />
            </>
          </Box>
        )}
      </Grid>

      {selected_expediente?.id_expediente_documental && (
        <Grid
          container
          spacing={4}
          margin={2}
          marginRight={20}
          justifyContent="flex-end"
        >
          <LoadingButton
            variant="contained"
            onClick={handle_adjuntar_archivo}
            disabled={false}
          >
            Agregar Archivo
          </LoadingButton>
        </Grid>
      )}
      {open_modal_archivo && (
        <ArchivoSoporteReapertura
          control_archivo_expediente={control_archivo_expediente}
          open={open_modal_archivo}
          handle_close_adjuntar_archivo={handle_close_adjuntar_archivo}
          get_values_archivo={get_values_archivo}
          handle_submit_archivo={handle_submit_archivo}
          selected_expediente={selected_expediente}
          set_selected_expediente={set_selected_expediente}
        />
      )}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={11.5} marginTop={3}>
          <Controller
            name="justificacion_reapertura"
            control={control_reapertura_expediente}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                label={'Justificación de Reapertura'}
                disabled={false}
                defaultValue={value}
                value={value}
                onChange={onChange}
                error={!(error == null)}
                sx={{
                  backgroundColor: 'white',
                }}
              ></TextField>
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
        <Grid item margin={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handle_reapertura_expediente(
              on_submit_reapertura_expediente
            )}
          >
            Guardar Reapertura
          </Button>
        </Grid>

        <Grid item margin={2}>
          <Button
            variant="contained"
            color="error"
            //   onClick={handle_close_buscar}
          >
            Salir
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ReaperturaExpedienteScreen;
