/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  IObjBandejas,
  IObjDepositos,
  IObjEstantes,
  IObjarbol,
  IObjcajas,
  IObjcarpetas,
} from '../interface/archivoFisico';
import { IList } from '../../configuracionMetadatos/interfaces/Metadatos';
import { api } from '../../../../api/axios';
import {
  avanzada_bandeja,
  avanzada_caja,
  avanzada_carpeta,
  avanzada_deposito,
  avanzada_deposito_mostrar,
  avanzada_estante,
  tabla_arbol_deposito,
} from '../store/thunks/thunksArchivoFisico';
import FormInputController from '../../../../components/partials/form/FormInputController';
import { LoadingButton } from '@mui/lab';
import {
  initial_state_bandeja,
  initial_state_caja,
  initial_state_carpetas,
  initial_state_deposito,
  initial_state_estante,
  reset_state,
  set_listado_depositos,
} from '../store/slice/indexArchivoFisico';

interface IProps {
  open: any;
  handle_close_buscar: any;
  set_tipo: any;
}

const BusquedaAvanzadaFisico = ({
  open,
  handle_close_buscar,
  set_tipo,
}: IProps) => {
  const {
    control: control_estante,
    handleSubmit: handle_submit_estante,
    getValues: get_values_estante,
    reset: reset_estante,
  } = useForm<IObjEstantes>();
  const {
    control: control_bandeja,
    handleSubmit: handle_submit_bandeja,
    getValues: get_values_bandeja,
    reset: reset_bandeja,
  } = useForm<IObjBandejas>();
  const {
    control: control_caja,
    handleSubmit: handle_submit_caja,
    getValues: get_values_caja,
    reset: reset_caja,
  } = useForm<IObjcajas>();

  const {
    control: control_carpeta,
    handleSubmit: handle_submit_carpeta,
    getValues: get_values_carpeta,
    reset: reset_carpeta,
  } = useForm<IObjcarpetas>();

  const dispatch = useAppDispatch();
  const [tipo_elemento, set_tipo_elemnto] = useState<IList[]>([]);
  const [tipo_elemento_seleccionado, set_tipo_elemento_seleccionado] =
    useState('');
  const [elemento, set_elemento] = useState<any>(null);
  const [deposito_seleccionado, set_deposito_seleccionado] =
    useState<IObjDepositos | null>(null);
  const [selected_items, set_selected_items] = useState({
    tipoElemento: '',
    deposito: null,
    estante: null,
    bandeja: null,
    caja: null,
    carpeta: null,
  });
  const { depositos, estantes, bandejas, cajas, carpetas, depositos_tabla } =
    useAppSelector((state) => state.archivo_fisico);

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };

  const columns: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => seleccionar_item_arbol(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_caja',
      headerName: 'Órden de carpeta',
      sortable: true,
      width: 100,
    },
    {
      field: 'identificacion_por_caja',
      headerName: 'Identificación de la Carpeta',
      sortable: true,
      width: 200,
    },
    {
      field: 'numero_expediente',
      headerName: 'Número de expediente',
      width: 200,
    },
    {
      field: 'identificacion_caja',
      headerName: 'Identificación de la caja',
      width: 250,
    },
    {
      field: 'identificacion_bandeja',
      headerName: 'Identificación de la Bandeja',
      width: 200,
    },
    {
      field: 'identificacion_estante',
      headerName: 'Identificación del Estante',
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Nombre del Depósito',
      width: 200,
    },
  ];

  const columns_estantes: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <Button
          onClick={() => seleccionar_item_arbol(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_deposito',
      headerName: 'Orden Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_deposito',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },

    {
      field: 'nombre_deposito',
      headerName: 'Nombre Depósito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_depositos: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => seleccionar_item_arbol(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'nombre_deposito',
      headerName: 'Nombre Depósito',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_entidad',
      headerName: 'Identificación Depósito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_bandejas: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => seleccionar_item_arbol(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_estante',
      headerName: 'Orden',
      sortable: true,
      width: 100,
    },
    {
      field: 'identificacion_por_estante',
      headerName: 'Bandeja',
      sortable: true,
      width: 200,
    },

    {
      field: 'identificacion_estante',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Deposito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_cajas: GridColDef[] = [
    {
      field: '',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => seleccionar_item_arbol(params.row)}
          startIcon={<PlaylistAddCheckIcon />}
        ></Button>
      ),
    },
    {
      field: 'orden_ubicacion_por_bandeja',
      headerName: 'Orden',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_bandeja',
      headerName: 'Caja',
      sortable: true,
      width: 200,
    },

    {
      field: 'identificacion_bandeja',
      headerName: 'Bandeja',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_estante',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Deposito',
      sortable: true,
      width: 200,
    },
  ];

  const columns_carpetas: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_caja',
      headerName: 'Orden',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_por_caja',
      headerName: 'Carpeta',
      sortable: true,
      width: 200,
    },
    {
      field: 'numero_expediente',
      headerName: 'Num. Expediente',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_caja',
      headerName: 'Caja',
      sortable: true,
      width: 200,
    },

    {
      field: 'identificacion_bandeja',
      headerName: 'Bandeja',
      sortable: true,
      width: 200,
    },
    {
      field: 'identificacion_estante',
      headerName: 'Estante',
      sortable: true,
      width: 200,
    },
    {
      field: 'nombre_deposito',
      headerName: 'Deposito',
      sortable: true,
      width: 200,
    },
  ];

  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: tipo_elemento_no_format } = await api.get(
          'gestor/choices/tipo-elemento-deposito/'
        );

        const tipo_elemento_format: IList[] = text_choise_adapter(
          tipo_elemento_no_format
        );

        set_tipo_elemnto(tipo_elemento_format);
      } catch (err) {
        console.log(err);
      }
    };

    void get_selects_options();
  }, []);

  useEffect(() => {
    if (depositos_tabla.length === 1) {
      let aux: any = {};

      depositos_tabla.forEach((objeto) => {
        console.log(objeto);
        if (
          objeto.identificacion_por_entidad !== null &&
          objeto.identificacion_por_entidad !== undefined
        ) {
          aux[objeto.identificacion_por_entidad] = true;
        }
        if (tipo_elemento_seleccionado === 'Estante') {
          if (objeto.estante !== null && objeto.estante !== undefined) {
            objeto.estante.forEach((objeto_estante) => {
              if (
                objeto_estante.identificacion_por_estante ===
                elemento?.identificacion_por_deposito
              ) {
                if (
                  objeto_estante.identificacion_por_estante !== null &&
                  objeto_estante.identificacion_por_estante !== undefined
                ) {
                  aux[objeto_estante.identificacion_por_estante] = true;
                }
              }
            });
          }
        } else if (tipo_elemento_seleccionado === 'Bandeja') {
          if (objeto.estante !== null && objeto.estante !== undefined) {
            objeto.estante.forEach((objeto_estante) => {
              if (
                objeto_estante.identificacion_por_estante ===
                elemento?.identificacion_estante
              ) {
                if (
                  objeto_estante.identificacion_por_estante !== null &&
                  objeto_estante.identificacion_por_estante !== undefined
                ) {
                  aux[objeto_estante.identificacion_por_estante] = true;
                  if (
                    objeto_estante.bandejas !== null &&
                    objeto_estante.bandejas !== undefined
                  ) {
                    objeto_estante.bandejas.forEach((objeto_bandeja) => {
                      if (
                        objeto_bandeja.identificacion_por_bandeja ===
                        elemento?.identificacion_por_estante
                      ) {
                        if (
                          objeto_bandeja.identificacion_por_bandeja !== null &&
                          objeto_bandeja.identificacion_por_bandeja !==
                            undefined
                        ) {
                          aux[objeto_bandeja.identificacion_por_bandeja] = true;
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        } else if (tipo_elemento_seleccionado === 'Caja') {
          if (objeto.estante !== null && objeto.estante !== undefined) {
            objeto.estante.forEach((objeto_estante) => {
              if (
                objeto_estante.identificacion_por_estante ===
                elemento?.identificacion_estante
              ) {
                if (
                  objeto_estante.identificacion_por_estante !== null &&
                  objeto_estante.identificacion_por_estante !== undefined
                ) {
                  aux[objeto_estante.identificacion_por_estante] = true;
                  if (
                    objeto_estante.bandejas !== null &&
                    objeto_estante.bandejas !== undefined
                  ) {
                    objeto_estante.bandejas.forEach((objeto_bandeja) => {
                      if (
                        objeto_bandeja.identificacion_por_bandeja ===
                        elemento?.identificacion_bandeja
                      ) {
                        if (
                          objeto_bandeja.identificacion_por_bandeja !== null &&
                          objeto_bandeja.identificacion_por_bandeja !==
                            undefined
                        ) {
                          aux[objeto_bandeja.identificacion_por_bandeja] = true;
                          if (
                            objeto_bandeja.cajas !== null &&
                            objeto_bandeja.cajas !== undefined
                          ) {
                            objeto_bandeja.cajas.forEach((objeto_caja) => {
                              if (
                                objeto_caja.identificacion_por_caja ===
                                elemento?.identificacion_por_bandeja
                              ) {
                                if (
                                  objeto_caja.identificacion_por_caja !==
                                    null &&
                                  objeto_caja.identificacion_por_caja !==
                                    undefined
                                ) {
                                  aux[objeto_caja.identificacion_por_caja] =
                                    true;
                                }
                              }
                            });
                          }
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        } else if (tipo_elemento_seleccionado === 'Carpeta') {
          if (objeto.estante !== null && objeto.estante !== undefined) {
            objeto.estante.forEach((objeto_estante) => {
              if (
                objeto_estante.identificacion_por_estante ===
                elemento?.identificacion_estante
              ) {
                if (
                  objeto_estante.identificacion_por_estante !== null &&
                  objeto_estante.identificacion_por_estante !== undefined
                ) {
                  aux[objeto_estante.identificacion_por_estante] = true;
                  if (
                    objeto_estante.bandejas !== null &&
                    objeto_estante.bandejas !== undefined
                  ) {
                    objeto_estante.bandejas.forEach((objeto_bandeja) => {
                      if (
                        objeto_bandeja.identificacion_por_bandeja ===
                        elemento?.identificacion_bandeja
                      ) {
                        if (
                          objeto_bandeja.identificacion_por_bandeja !== null &&
                          objeto_bandeja.identificacion_por_bandeja !==
                            undefined
                        ) {
                          aux[objeto_bandeja.identificacion_por_bandeja] = true;
                          if (
                            objeto_bandeja.cajas !== null &&
                            objeto_bandeja.cajas !== undefined
                          ) {
                            objeto_bandeja.cajas.forEach((objeto_caja) => {
                              if (
                                objeto_caja.identificacion_por_caja ===
                                elemento?.identificacion_caja
                              ) {
                                if (
                                  objeto_caja.identificacion_por_caja !==
                                    null &&
                                  objeto_caja.identificacion_por_caja !==
                                    undefined
                                ) {
                                  aux[objeto_caja.identificacion_por_caja] =
                                    true;
                                  if (
                                    objeto_caja.carpetas !== null &&
                                    objeto_caja.carpetas !== undefined
                                  ) {
                                    objeto_caja.carpetas.forEach(
                                      (objeto_carpeta) => {
                                        if (
                                          objeto_carpeta.identificacion_por_carpeta ===
                                          elemento?.identificacion_por_caja
                                        ) {
                                          if (
                                            objeto_carpeta.identificacion_por_carpeta !==
                                              null &&
                                            objeto_carpeta.identificacion_por_carpeta !==
                                              undefined
                                          ) {
                                            aux[
                                              objeto_carpeta.identificacion_por_carpeta
                                            ] = true;
                                          }
                                        }
                                      }
                                    );
                                  }
                                }
                              }
                            });
                          }
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });

      console.log(aux);
      set_tipo(aux);
    }
  }, [depositos_tabla]);

  const mostrar_deposito: any = async () => {
    const nombreDeposito =
      deposito_seleccionado?.identificacion_por_entidad || null;
    void dispatch(avanzada_deposito_mostrar(nombreDeposito));
    set_selected_items((prevItems: any) => ({
      ...prevItems,
      tipoElemento: tipo_elemento_seleccionado,
    }));
    console.log(tipo_elemento_seleccionado);
  };
  const seleccionar_item_arbol: any = (data: any) => {
    set_elemento(data);
    const depositos_aux: IObjDepositos[] = depositos_tabla.filter((objeto) => {
      return objeto.id_deposito === data?.id_deposito;
    });
    dispatch(set_listado_depositos(depositos_aux));
    void dispatch(tabla_arbol_deposito(data?.id_deposito ?? ''));
  };

  const limpiar: any = () => {
    reset_bandeja(initial_state_bandeja);
    reset_estante(initial_state_estante);
    reset_caja(initial_state_caja);
    reset_carpeta(initial_state_carpetas);
    set_tipo_elemento_seleccionado('');
    set_deposito_seleccionado(initial_state_deposito);
    set_selected_items({
      tipoElemento: '',
      deposito: null,
      estante: null,
      bandeja: null,
      caja: null,
      carpeta: null,
    });
  };

  const mostrar_estante: any = async () => {
    const identificacion_estante =
      get_values_estante('identificacion_por_deposito') ?? '';

    const nombreDeposito = deposito_seleccionado?.nombre_deposito || null;
    void dispatch(avanzada_estante(identificacion_estante, nombreDeposito));
    set_selected_items((prevItems: any) => ({
      ...prevItems,
      tipoElemento: tipo_elemento_seleccionado,
    }));
  };

  const mostrar_bandeja: any = async () => {
    const identificacion_estante =
      get_values_bandeja('identificacion_estante') ?? '';
    const identificacion_bandeja =
      get_values_bandeja('identificacion_por_estante') ?? '';
    const nombreDeposito = deposito_seleccionado?.nombre_deposito || null;
    void dispatch(
      avanzada_bandeja(
        identificacion_estante,
        nombreDeposito,
        identificacion_bandeja
      )
    );
    set_selected_items((prevItems: any) => ({
      ...prevItems,
      tipoElemento: tipo_elemento_seleccionado,
    }));
  };

  const mostrar_caja: any = async () => {
    const identificacion_estante =
      get_values_caja('identificacion_estante') ?? '';
    const identificacion_bandeja =
      get_values_caja('identificacion_bandeja') ?? '';
    const identificacion_caja =
      get_values_caja('identificacion_por_bandeja') ?? '';
    const nombreDeposito = deposito_seleccionado?.nombre_deposito || null;
    void dispatch(
      avanzada_caja(
        identificacion_estante,
        nombreDeposito,
        identificacion_bandeja,
        identificacion_caja
      )
    );
    set_selected_items((prevItems: any) => ({
      ...prevItems,
      tipoElemento: tipo_elemento_seleccionado,
    }));
  };
  const mostrar_carpeta: any = async () => {
    const identificacion_estante =
      get_values_carpeta('identificacion_estante') ?? '';
    const identificacion_bandeja =
      get_values_carpeta('identificacion_bandeja') ?? '';
    const identificacion_caja = get_values_carpeta('identificacion_caja') ?? '';
    const identificacion_carpeta =
      get_values_carpeta('identificacion_por_caja') ?? '';
    const numero_expediente = get_values_carpeta('numero_expediente') ?? '';
    const nombreDeposito = deposito_seleccionado?.nombre_deposito || null;
    void dispatch(
      avanzada_carpeta(
        identificacion_estante,
        nombreDeposito,
        identificacion_bandeja,
        identificacion_caja,
        identificacion_carpeta,
        numero_expediente
      )
    );
    set_selected_items((prevItems: any) => ({
      ...prevItems,
      tipoElemento: tipo_elemento_seleccionado,
    }));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_buscar}>
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
              marginLeft: '-5px',
            }}
          >
            <Title title="BÚSQUEDA AVANZADA" />

            <Grid container justifyContent={'center'}>
              <Grid item xs={12} sm={6} margin={2} marginTop={1.2}>
                <TextField
                  autoFocus
                  margin="dense"
                  fullWidth
                  select
                  size="small"
                  label="Tipo de Elemento"
                  variant="outlined"
                  disabled={false}
                  value={tipo_elemento_seleccionado}
                  sx={{
                    backgroundColor: 'white',
                  }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => {
                    const selectedType = event.target.value;
                    set_tipo_elemento_seleccionado(selectedType);
                  }}
                >
                  {tipo_elemento.map((option) => (
                    <MenuItem key={option.label} value={option.label ?? ''}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {tipo_elemento_seleccionado === 'Depósito de Archivo' && (
                <Grid item xs={12} sm={3}>
                  <Box sx={{ margin: 2, marginTop: 1.4 }}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      disablePortal
                      id="combo-box-demo"
                      options={depositos}
                      value={deposito_seleccionado}
                      onChange={(event, newValue) => {
                        set_deposito_seleccionado(newValue || null);
                      }}
                      getOptionLabel={(option) =>
                        option.id_deposito !== null
                          ? option.nombre_deposito +
                            ' - ' +
                            (option.identificacion_por_entidad ?? '')
                          : ''
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Depósito"
                          variant="outlined"
                          size="small"
                          error={false}
                          sx={{
                            backgroundColor: 'white',
                            marginTop: 0.5,
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              )}

              {tipo_elemento_seleccionado === 'Estante' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2, marginTop: 1.4 }}>
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={depositos}
                        value={deposito_seleccionado}
                        onChange={(event, newValue) => {
                          set_deposito_seleccionado(newValue || null);
                        }}
                        getOptionLabel={(option) =>
                          option.id_deposito !== null
                            ? option.nombre_deposito +
                              ' - ' +
                              (option.identificacion_por_entidad ?? '')
                            : ''
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Depósito"
                            variant="outlined"
                            size="small"
                            error={!(Error == null)}
                            sx={{
                              backgroundColor: 'white',
                              marginTop: 0.5,
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_estante}
                        control_name="identificacion_por_deposito"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación del Estante'}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}

              {tipo_elemento_seleccionado === 'Bandeja' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2, marginTop: 1.4 }}>
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={depositos}
                        value={deposito_seleccionado}
                        onChange={(event, newValue) => {
                          set_deposito_seleccionado(newValue || null);
                        }}
                        getOptionLabel={(option) =>
                          option.id_deposito !== null
                            ? option.nombre_deposito +
                              ' - ' +
                              (option.identificacion_por_entidad ?? '')
                            : ''
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Depósito"
                            variant="outlined"
                            size="small"
                            error={!(Error == null)}
                            sx={{
                              backgroundColor: 'white',
                              marginTop: 0.5,
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_bandeja}
                        control_name="identificacion_por_deposito"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación del Estante'}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_bandeja}
                        control_name="identificacion_por_estante"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación de la Bandeja'}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}

              {tipo_elemento_seleccionado === 'Caja' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2, marginTop: 1.4 }}>
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={depositos}
                        value={deposito_seleccionado}
                        onChange={(event, newValue) => {
                          set_deposito_seleccionado(newValue || null);
                        }}
                        getOptionLabel={(option) =>
                          option.id_deposito !== null
                            ? option.nombre_deposito +
                              ' - ' +
                              (option.identificacion_por_entidad ?? '')
                            : ''
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Depósito"
                            variant="outlined"
                            size="small"
                            error={!(Error == null)}
                            sx={{
                              backgroundColor: 'white',
                              marginTop: 0.5,
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_caja}
                        control_name="identificacion_por_deposito"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación del Estante'}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_caja}
                        control_name="identificacion_por_estante"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación de la Bandeja'}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_caja}
                        control_name="identificacion_por_bandeja"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación de la Caja'}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}

              {tipo_elemento_seleccionado === 'Carpeta' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2, marginTop: 1.4 }}>
                      <Autocomplete
                        fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={depositos}
                        value={deposito_seleccionado}
                        onChange={(event, newValue) => {
                          set_deposito_seleccionado(newValue || null);
                        }}
                        getOptionLabel={(option) =>
                          option.id_deposito !== null
                            ? option.nombre_deposito +
                              ' - ' +
                              (option.identificacion_por_entidad ?? '')
                            : ''
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Depósito"
                            variant="outlined"
                            size="small"
                            error={!(Error == null)}
                            sx={{
                              backgroundColor: 'white',
                              marginTop: 0.5,
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_carpeta}
                        control_name="identificacion_por_deposito"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación del Estante'}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_carpeta}
                        control_name="identificacion_por_estante"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación de la Bandeja'}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_carpeta}
                        control_name="identificacion_caja"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Identificación de la Caja'}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_carpeta}
                        control_name="identificacion_por_caja"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Carpeta'}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ margin: 2 }}>
                      <FormInputController
                        xs={12}
                        md={0}
                        margin={0}
                        marginTop={1.5}
                        control_form={control_carpeta}
                        control_name="numero_expediente"
                        default_value=""
                        rules={{}}
                        type="text"
                        disabled={false}
                        helper_text=""
                        hidden_text={null}
                        label={'Número de expediente'}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <>
              {selected_items.tipoElemento === 'Depósito de Archivo' && (
                <Box sx={{ width: '50%' }}>
                  <>
                    <DataGrid
                      density="compact"
                      autoHeight
                      columns={columns_depositos}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      rows={depositos}
                      getRowId={(row) => row.id_deposito}
                    />
                  </>
                </Box>
              )}
              {selected_items.tipoElemento === 'Estante' && (
                <Box sx={{ width: '60%' }}>
                  <>
                    <DataGrid
                      density="compact"
                      autoHeight
                      columns={columns_estantes}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      rows={estantes}
                      getRowId={(row) => row.id_estante_deposito}
                    />
                  </>
                </Box>
              )}
              {selected_items.tipoElemento === 'Bandeja' && (
                <Box sx={{ width: '75%' }}>
                  <>
                    <DataGrid
                      density="compact"
                      autoHeight
                      columns={columns_bandejas}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      rows={bandejas}
                      getRowId={(row) => row.id_bandeja_estante}
                    />
                  </>
                </Box>
              )}
              {selected_items.tipoElemento === 'Caja' && (
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <>
                      <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns_cajas}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        rows={cajas}
                        getRowId={(row) => row.id_caja_bandeja}
                      />
                    </>
                  </Box>
                </Grid>
              )}
              {selected_items.tipoElemento === 'Carpeta' && (
                <Grid item xs={12}>
                  <Box sx={{ width: '100%' }}>
                    <>
                      <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns_carpetas}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        rows={carpetas}
                        getRowId={(row) => row.id_carpeta_caja}
                      />
                    </>
                  </Box>
                </Grid>
              )}
            </>
          </Grid>
          {tipo_elemento_seleccionado === 'Estante' && (
            <Grid container spacing={2} marginTop={2} justifyContent="center">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={handle_submit_estante(mostrar_estante)}
              >
                Buscar Estante
              </LoadingButton>
            </Grid>
          )}
          {tipo_elemento_seleccionado === 'Depósito de Archivo' && (
            <Grid container spacing={2} marginTop={2} justifyContent="center">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={mostrar_deposito}
              >
                Buscar deposito
              </LoadingButton>
            </Grid>
          )}
          {tipo_elemento_seleccionado === 'Bandeja' && (
            <Grid container spacing={2} marginTop={2} justifyContent="center">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={handle_submit_bandeja(mostrar_bandeja)}
              >
                Buscar Bandeja
              </LoadingButton>
            </Grid>
          )}
          {tipo_elemento_seleccionado === 'Caja' && (
            <Grid container spacing={2} marginTop={2} justifyContent="center">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={handle_submit_caja(mostrar_caja)}
              >
                Buscar Caja
              </LoadingButton>
            </Grid>
          )}
          {tipo_elemento_seleccionado === 'Carpeta' && (
            <Grid container spacing={2} marginTop={2} justifyContent="center">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={handle_submit_carpeta(mostrar_carpeta)}
              >
                Buscar Carpeta
              </LoadingButton>
            </Grid>
          )}

          <Grid container spacing={2} justifyContent="center" marginTop={2}>
            
          <Grid item margin={2}>
            <LoadingButton
              type="submit"
              variant="outlined"
              color="primary"
              onClick={limpiar}
            >
              Limpiar
            </LoadingButton>
            </Grid>
            <Grid item margin={2}>
              <Button
                variant="contained"
                color="error"
                onClick={handle_close_buscar}
              >
                Salir
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusquedaAvanzadaFisico;
