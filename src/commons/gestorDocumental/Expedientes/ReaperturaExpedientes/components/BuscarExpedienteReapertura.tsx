/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import {
  get_busqueda_avanzada_expediente_cerrado,
  get_tipologias,
  get_trd,
  serie_trd,
} from '../../cierreExpediente/store/thunks/cierreExpedientesthunks';
import FormDatePickerControllerV from '../../../../../components/partials/form/FormDatePickerControllerv';
import { IObjTrd } from '../../cierreExpediente/interfaces/cierreExpedientes';

interface IProps {
  control_reapertura_expediente: any;
  open: any;
  handle_close_buscar_reapertura: any;
  get_values: any;
  handle_selected_expediente: any;
}

const BuscarExpedienteReapertura = ({
  control_reapertura_expediente,
  open,
  handle_close_buscar_reapertura,
  get_values,
  handle_selected_expediente,
}: IProps) => {
  const { expedientes, trd, serie_subserie } = useAppSelector(
    (state) => state.cierre_expedientes
  );
  const dispatch = useAppDispatch();
  const [trdOptions, setTrdOptions] = useState<IObjTrd[]>([]);

  useEffect(() => {
    void dispatch(get_trd());
    void dispatch(get_tipologias());
  }, []);

  useEffect(() => {
    setTrdOptions(trd);
    console.log('TRD:', trd);
  }, [trd]);

  const columns: GridColDef[] = [
    {
      field: 'codigo_exp_und_serie_subserie',
      headerName: 'CÓDIGO',
      sortable: true,
      width: 200,
      renderCell: (params) => (
        <span>{`${params.row.codigo_exp_und_serie_subserie} . ${
          params.row.codigo_exp_Agno
        } ${
          params.row.codigo_exp_consec_por_agno !== null
            ? `. ${params.row.codigo_exp_consec_por_agno}`
            : ''
        }`}</span>
      ),
    },
    {
      field: 'nombre_trd_origen',
      headerName: 'TRD',
      sortable: true,
      width: 200,
    },
    {
      field: 'titulo_expediente',
      headerName: 'TITULO',
      width: 200,
    },
    {
      field: 'nombre_unidad_org',
      headerName: 'UNIDAD ORGANIZACIONAL',
      width: 250,
    },
    {
      field: 'nombre_serie_origen',
      headerName: 'SERIE',
      width: 200,
    },
    {
      field: 'nombre_subserie_origen',
      headerName: 'SUB SERIE',
      width: 200,
    },
    {
      field: 'fecha_apertura_expediente',
      headerName: 'AÑO',
      width: 200,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={() => handle_selected_expediente(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
  ];

  const mostrar_busqueda_expediente: any = async () => {
    const titulo_expediente = get_values('titulo_expediente') ?? '';
    const codigos_uni_serie_subserie =
      get_values('codigos_uni_serie_subserie') ?? '';
    const nombre_tdr_origen = get_values('nombre_tdr_origen') ?? '';
    const fecha_apertura_expediente =
      get_values('fecha_apertura_expediente') ?? '';
    const id_serie_origen = get_values('id_serie_origen') ?? '';
    const id_subserie_origen = get_values('id_subserie_origen') ?? '';
    const fecha_inicio_expediente = get_values('fecha_inicio_expediente') ?? '';
    const fecha_fin_expediente = get_values('fecha_fin_expediente') ?? '';
    const codigo_exp_consec_por_agno =
      get_values('codigo_exp_consec_por_agno') ?? '';
    void dispatch(
      get_busqueda_avanzada_expediente_cerrado(
        titulo_expediente,
        nombre_tdr_origen,
        codigos_uni_serie_subserie,
        fecha_apertura_expediente,
        id_serie_origen,
        id_subserie_origen,
        fecha_inicio_expediente,
        fecha_fin_expediente,
        codigo_exp_consec_por_agno
      )
    );
  };

  useEffect(() => {
    console.log(expedientes);
  }, [expedientes]);

  return (
    <>
      <Grid item>
        <Button variant="contained" color="primary">
          Buscar
        </Button>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handle_close_buscar_reapertura}
      >
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              marginTop: '20px',
              marginLeft: '-5px',
            }}
          >
            <Title title="BÚSQUEDA DE EXPEDIENTES CERRADOS" />
            <Grid container sx={{ mt: '10px', mb: '20px' }}>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <Controller
                    name="titulo_expediente"
                    control={control_reapertura_expediente}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Titulo"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      ></TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <Controller
                    name="codigo_exp_und_serie_subserie"
                    control={control_reapertura_expediente}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Código Und. Serie. Subserie"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      ></TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <Controller
                    name="fecha_apertura_expediente"
                    control={control_reapertura_expediente}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Año de Apertura"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      ></TextField>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                <Grid item xs={12} sm={3.5} margin={2}>
                  <Controller
                    name="nombre_trd_origen"
                    control={control_reapertura_expediente}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        key={trdOptions ? trdOptions.length : 0}
                        margin="dense"
                        fullWidth
                        select
                        size="small"
                        label="TRD"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          const selectedTrd = trdOptions.find(
                            (option) => option.nombre === e.target.value
                          );
                          if (selectedTrd) {
                            // Aquí puedes acceder a la propiedad id_ccd de selectedTrd
                            const id_ccd: number | undefined | null =
                              selectedTrd.id_ccd;
                            if (id_ccd !== null && id_ccd !== undefined) {
                              console.log('id_ccd:', id_ccd);
                              // También puedes realizar cualquier otra acción que necesites con id_ccd
                              void dispatch(serie_trd(id_ccd));
                            }
                          }
                        }}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      >
                        {trdOptions &&
                          trdOptions.map((option) => (
                            <MenuItem
                              key={option.id_trd}
                              value={option.nombre ?? ''}
                            >
                              {option.nombre}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <Controller
                    name="id_serie_origen"
                    control={control_reapertura_expediente}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        select
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Serie"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      >
                        {serie_subserie.map((option) => (
                          <MenuItem
                            key={option.id_cat_serie_und}
                            value={option.nombre_serie ?? ''}
                          >
                            {option.nombre_serie}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2}>
                  <Controller
                    name="id_suberie_origen"
                    control={control_reapertura_expediente}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        select
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="SubSerie"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      >
                        {serie_subserie.map((option) => (
                          <MenuItem
                            key={option.id_cat_serie_und}
                            value={option.nombre_subserie ?? ''}
                          >
                            {option.nombre_subserie}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                <Grid item xs={12} sm={3.5} marginTop={2}>
                  <FormDatePickerControllerV
                    xs={0}
                    md={0}
                    margin={0}
                    marginTop={3}
                    control_form={control_reapertura_expediente}
                    control_name={'fecha_inicio_expediente'}
                    default_value={null}
                    rules={{}}
                    label={'Fecha de inicio del Expediente'}
                    disabled={false}
                    format={'YYYY-MM-DD'}
                    helper_text={''}
                  />
                </Grid>
                <Grid item xs={12} sm={3.5} marginTop={2} marginLeft={4}>
                  <FormDatePickerControllerV
                    xs={0}
                    md={0}
                    margin={0}
                    marginTop={3}
                    control_form={control_reapertura_expediente}
                    control_name={'fecha_fin_expediente'}
                    default_value={null}
                    rules={{ required_rule: { rule: false, message: '' } }}
                    label={'Fecha final del Expediente'}
                    disabled={false}
                    format={'YYYY-MM-DD'}
                    helper_text={''}
                  />
                </Grid>
                <Grid item xs={12} sm={3.5} marginTop={2} marginLeft={4}>
                  <Controller
                    name="codigo_exp_consec_por_agno"
                    control={control_reapertura_expediente}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Código consecutivo por Año"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      ></TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} marginTop={2} margin={2}>
                  <Controller
                    name="palabras_clave_expediente"
                    control={control_reapertura_expediente}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        size="small"
                        label="Palabras Clave"
                        variant="outlined"
                        disabled={false}
                        defaultValue={value}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        sx={{
                          backgroundColor: 'white',
                        }}
                        InputLabelProps={{ shrink: true }}
                      ></TextField>
                    )}
                  />
                </Grid>
              </Grid>

              <>
                {expedientes.length > 0 && (
                  <Grid item xs={12}>
                    <Title title="Resultados de la búsqueda" />
                    {/* <Typography>Resultados de la búsqueda</Typography> */}
                  </Grid>
                )}
                {expedientes.length > 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                      <>
                        <DataGrid
                          density="compact"
                          autoHeight
                          columns={columns}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          rows={expedientes}
                          getRowId={(row) => row.id_expediente_documental}
                        />
                      </>
                    </Box>
                  </Grid>
                )}
              </>
              <Grid
                container
                spacing={2}
                marginTop={2}
                justifyContent="flex-end"
              >
                <Grid item margin={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={mostrar_busqueda_expediente}
                  >
                    Buscar
                  </Button>
                </Grid>

                <Grid item margin={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handle_close_buscar_reapertura}
                  >
                    Salir
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuscarExpedienteReapertura;
