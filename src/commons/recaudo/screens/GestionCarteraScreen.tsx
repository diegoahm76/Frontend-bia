/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type SyntheticEvent, useState, useEffect, useContext } from 'react';
import { Avatar, Box, Grid, IconButton, type SelectChangeEvent, Tab, Tooltip, Chip, Pagination, Stack, TextField, Button } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Title } from "../../../components"
import { EditarCartera } from '../components/GestionCartera/EditarCartera';
import { CobroCoactivo } from '../components/GestionCartera/CobroCoactivo';
import { DataGrid, GridToolbar, type GridColDef } from '@mui/x-data-grid';
import type { AtributoEtapa, CategoriaAtributo, Proceso, ValoresProceso } from '../interfaces/proceso';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { FlujoProceso } from '../interfaces/flujoProceso';
import { api } from '../../../api/axios';
import { RequisitosModal } from '../components/GestionCartera/modal/RequisitosModal';
import { NotificationModal } from '../components/NotificationModal';
import type { Cartera } from '../interfaces/cobro';
import { CreateProcesoModal } from '../components/GestionCartera/modal/CreateProcesoModal';
import { SeccionEnvio_MSM_CORREO_F } from '../components/GestionCartera/secciones-etapas/SeccionEnvio_MSM_CORREO';
import { EtapaProcesoConext } from '../components/GestionCartera/Context/EtapaProcesoContext';
import { toast } from 'react-toastify';
import { control_error, control_success } from '../../../helpers';
import RefreshIcon from '@mui/icons-material/Refresh';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { showAlert } from '../../../utils/showAlert/ShowAlert';
import { DocumentoPagoPersuasivo } from '../components/GestionCartera/DocumentoPagoPersuasivo';
import { ProcesoPagoCoactivo } from '../components/GestionCartera/ProcesoPagoCoactivo';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionCarteraScreen: React.FC = () => {
  const [carteras, set_carteras] = useState<Cartera[]>([]);
  const [current_page, set_current_page] = useState<number>(0);
  const [count, set_count] = useState<number>(0);
  const [loading, set_loading] = useState<boolean>(true);
  const [procesos, set_procesos] = useState<Proceso[]>([]);
  const [categorias, set_categorias] = useState<CategoriaAtributo[]>([]);
  const [position_tab, set_position_tab] = useState('1');
  // eslint-disable-next-line no-unused-vars
  const [data_complemet, set_data_complemet] = useState<any[]>([]);
  const [selected_proceso, set_selected_proceso] = useState({
    fecha_facturacion: '',
    numero_factura: '',
    codigo_contable: '',
    monto_inicial: '',
    dias_mora: '',
    valor_intereses: '',
    valor_sancion: '',
    data_complement: "",
    etapa: '',
  });
  const [id_proceso, set_id_proceso] = useState('');
  const [id_etapa, set_id_etapa] = useState<number | null>(null);
  const [id_cartera, set_id_cartera] = useState('');
  const [flujos_proceso, set_flujos_proceso] = useState<FlujoProceso[]>([]);
  const [flujos_destino, set_flujos_destino] = useState<FlujoProceso[]>([]);
  const [id_flujo_destino, set_id_flujo_destino] = useState('');
  const [id_etapa_destino, set_id_etapa_destino] = useState('');
  const [id_subetapa_destino, set_id_subetapa_destino] = useState('');
  const [requisitos, set_requisitos] = useState('');
  const [atributos_etapa, set_atributos_etapa] = useState<AtributoEtapa[][]>([]);
  const [input_values, set_input_values] = useState<Record<string, string>>({});
  const [input_files, set_input_files] = useState<Record<string, File>>({});
  const [open_requisitos_modal, set_open_requisitos_modal] = useState(false);
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const [open_create_proceso_modal, set_open_create_proceso_modal] = useState(false);
  const [valores_proceso, set_valores_proceso] = useState<ValoresProceso[][]>([]);
  const [subetapas, set_subetapas] = useState<AtributoEtapa[]>([]);
  const { is_from_liquidacion, set_etapa_proceso, set_is_from_liquidacion } = useContext(EtapaProcesoConext);
  const [cobro_persuasivo_active, set_cobro_persuasivo_active] = useState<boolean>(false);
  const [cobro_coactivo_active, set_cobro_coactivo_active] = useState<boolean>(false);

  const [filtered_nombres, set_filtered_nombres] = useState<string>('');
  const [filtered_apellidos, set_filtered_apellidos] = useState<string>('');
  const [filtered_identificacion, set_filtered_identificacion] = useState<string>('');
  const [datos, set_datos] = useState<string>('');

  const columns_carteras: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Cartera',
      minWidth: 9220,
      flex: 1,
    },
    {
      field: 'tipo_renta',
      headerName: 'Tipo Renta',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.value ?? 'Sin tipo renta';
      }
    },
    {
      field: 'Resolucion ',
      headerName: 'Resolucion   ',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.value ?? 'Sin tipo Resolucion';
      }
    },
    {
      field: 'Periodo ',
      headerName: 'Periodo   ',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.value ?? 'Sin Periodo';
      }
    },
    {
      field: 'Expediente ',
      headerName: 'Expediente   ',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.value ?? 'Sin Expediente';
      }
    },
    {
      field: 'Descuento ',
      headerName: 'Descuento   ',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.value ?? 'Sin tipo renta';
      }
    },
    {
      field: 'id_deudor',
      headerName: 'Nit Deudor',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.identificacion;
      }
    },
    {
      field: 'nombres_deudor',
      headerName: 'Nombres Deudor',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.row.id_deudor.nombres;
      }
    },
    {
      field: 'apellidos_deudor',
      headerName: 'Apellidos Deudor',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.row.id_deudor.apellidos;
      }
    },
    {
      field: 'fecha_facturacion',
      headerName: 'Fecha factura',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'numero_factura',
      headerName: 'Número Factura',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'dias_mora',
      headerName: 'Días mora',
      minWidth: 90,
      flex: 1,
      renderCell: (params) => {
        return get_rango_color(params.row.id, params.value);
      }
    },
    {
      field: 'proceso_cartera',
      headerName: 'Etapas',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return procesos.find((proceso) => proceso.id === params.value[0]?.id)?.id_etapa.etapa ?? 'Sin etapa activa';
      }
    },
    {
      field: 'id_categoria',
      headerName: 'Subetapas',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return categorias.find((categoria) => categoria.id === params.row.proceso_cartera[0]?.id_categoria)?.categoria ?? 'Sin subetapa activa';
      }
    },

    {
      field: 'monto_inicial',
      headerName: 'Saldo Capital',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'valor_intereses',
      headerName: 'Saldo Intereses',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'codigo_contable',
      headerName: 'Código contable',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'valor_sancion',
      headerName: 'Valor sanción',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title='Editar'>
              <IconButton
                onClick={() => {
                  set_selected_proceso({
                    fecha_facturacion: params.row.fecha_facturacion ?? '',
                    numero_factura: params.row.numero_factura ?? '',
                    codigo_contable: params.row.codigo_contable.toString() ?? '',
                    monto_inicial: params.row.monto_inicial ?? '',
                    dias_mora: params.row.dias_mora.toString() ?? '',
                    valor_intereses: params.row.valor_intereses ?? '',
                    valor_sancion: params.row.valor_sancion ?? '',
                    data_complement: params.row ?? "",
                    etapa: procesos.find(proceso => proceso.id === params.row.proceso_cartera[0]?.id)?.id_etapa.etapa ?? 'Sin proceso activo',
                  });
                  set_atributos_etapa([]);
                  set_id_proceso(params.row.proceso_cartera[0]?.id ?? '');
                  set_id_etapa(params.row.proceso_cartera[0]?.id_etapa ?? '');
                  set_id_cartera(params.row.id);
                  set_position_tab('2');
                  set_data_complemet(params.row);
                  set_datos(params.row);
                  set_etapa_proceso((prevEtapa: any) => ({
                    ...prevEtapa,
                    mostrar_modal: true,
                  }));
                  set_is_from_liquidacion(false);


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
                  <EditIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        )
      }
    }
  ];

  useEffect(() => {
    if(id_etapa){
      //TODO: Utilizar servicio para traer la etapa y comparar, el id puede cambiar en el futuro
      (id_etapa == 13 || id_etapa == 14)
        ? set_cobro_persuasivo_active(true)
        : set_cobro_persuasivo_active(false);

      (id_etapa == 14)
        ? set_cobro_coactivo_active(true)
        : set_cobro_coactivo_active(false);

      // api.get(`recaudo/procesos/etapas/${id_etapa}`)
      //   .then((response) => {
      //     console.log(response.data)
      //   })
      //   .catch((error) => {
      //      console.log('')(error);
      //   })
    }
  }, [id_etapa]);

  useEffect(() => {
    if(is_from_liquidacion){
      set_cobro_persuasivo_active(true);
      set_position_tab('3');
    }
  }, [is_from_liquidacion])

  useEffect(() => {
    api.get('recaudo/procesos/procesos-sin-finalizar')
      .then((response) => {
        set_procesos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api.get('recaudo/procesos/categoria-atributos')
      .then((response) => {
        set_categorias(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    api.get(`recaudo/cobros/carteras/?limit=10&offset=${current_page}`)
      .then((response) => {
        set_carteras(response.data.results.data);
        set_count(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set_loading(false);
      });
  }, [current_page]);

  useEffect(() => {
    api.get('recaudo/procesos/flujos')
      .then((response) => {
        set_flujos_proceso(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (id_etapa) {
      const new_flujos_proceso = flujos_proceso.filter(flujo => flujo.id_etapa_origen.id === id_etapa);
      console.log(flujos_proceso);
      set_flujos_destino(new_flujos_proceso);
    } else {
      set_flujos_destino(flujos_proceso);
    }
  }, [id_etapa]);

  useEffect(() => {
    if (id_proceso) {
      api.get(`recaudo/procesos/valores-proceso/${id_proceso}`)
        .then((response) => {
          group_valores_proceso(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id_proceso]);

  useEffect(() => {
    if (id_flujo_destino) {
      const new_id_etapa_destino = flujos_proceso.find(flujo_proceso => flujo_proceso.id === Number(id_flujo_destino))?.id_etapa_destino.id;
      if (new_id_etapa_destino) {
        set_id_etapa_destino(new_id_etapa_destino.toString());
      }
    }
  }, [id_flujo_destino]);

  useEffect(() => {
    if (id_etapa) {
      api.get(`recaudo/procesos/atributos/${id_etapa}`)
        .then((response) => {
          delete_duplicated_atributos(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id_etapa]);

  const update_procesos_sin_finalizar = (): void => {
    api.get('recaudo/procesos/procesos-sin-finalizar')
      .then((response) => {
        set_procesos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const update_carteras = (): void => {
    set_loading(true);
    api.get(`recaudo/cobros/carteras/?limit=10&offset=${current_page}`)
      .then((response) => {
        set_carteras(response.data.results.data);
        set_count(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set_loading(false);
      });
  };

  const update_flujos = (): void => {
    api.get('recaudo/procesos/flujos')
      .then((response) => {
        set_flujos_proceso(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
      set_id_flujo_destino('');
    }
  };

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    if (event.target.name === 'id_flujo_destino') {
      set_id_subetapa_destino('');
      const requisitos_actual = flujos_proceso.filter(flujo => flujo.id === Number(event.target.value))[0].requisitos;
      set_id_flujo_destino(event.target.value);
      set_requisitos(requisitos_actual);
    }
    if (event.target.name === 'id_subetapa_destino') {
      set_id_subetapa_destino(event.target.value);
    }
  };

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>, name: string): void => {
    const { value } = event.target;
    set_input_values((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const update_etapa_cartera = (): void => {
    if (id_etapa_destino) {
      set_id_flujo_destino('');
      set_id_subetapa_destino('');
      set_flujos_destino([]);
      set_selected_proceso((previousState) => ({
        ...previousState,
        etapa: procesos.find((proceso) => proceso.id_etapa.id === Number(id_etapa_destino))?.id_etapa.etapa ?? 'Sin proceso activo',
      }));
      set_id_etapa(Number(id_etapa_destino));
    }
  };

  const mover_etapa_actual = (): void => {
    if (id_flujo_destino) {
      api.post(`recaudo/procesos/actualizar-proceso/${id_proceso}/`, {
        id_etapa: id_etapa_destino,
      })
        .then((response) => {
          update_flujos();
          update_procesos_sin_finalizar();
          update_carteras();
          update_etapa_cartera();
          set_notification_info({ type: 'success', message: response.data.data });
          set_open_notification_modal(true);
        })
        .catch((error) => {
          console.log(error);
        });
      api.get(`recaudo/procesos/atributos/${id_etapa_destino}`)
        .then((response) => {
          set_values(response.data.data);
          group_atributos(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  const mover_subetapa_actual = (): void => {
    if (id_subetapa_destino) {
      api.post(`recaudo/procesos/actualizar-categoria-proceso/${id_proceso}/`, {
        id_categoria: id_subetapa_destino,
      })
        .then((response) => {
          //  console.log('')(response);
          update_flujos();
          update_procesos_sin_finalizar();
          update_carteras();


          if (response.status === 200) {

            set_etapa_proceso((prevEtapa: any) => ({
              ...prevEtapa,
              disable: false,
              tipo_cambio: id_subetapa_destino,
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const set_values = (atributos: AtributoEtapa[]): void => {
    const new_input_values: Record<string, string> = {};
    const new_input_files: Record<string, File> = {};

    atributos.forEach(objeto => {
      const key: string = `${objeto.id}-${objeto.id_tipo.tipo}`;
      if (objeto.id_tipo.tipo === 'Documento') {
        new_input_files[key] = new File([''], '');
      } else {
        new_input_values[key] = '';
      }
    });

    set_input_files(new_input_files);
    set_input_values(new_input_values);
  };

  const delete_duplicated_atributos = (atributos: AtributoEtapa[]): void => {
    const unique_atributos: AtributoEtapa[] = [];
    for (const atributo of atributos) {
      const is_duplicated = unique_atributos.find((atributo_unico) => atributo_unico.id_categoria.id === atributo.id_categoria.id);
      if (!is_duplicated) {
        unique_atributos.push(atributo);
      }
    }
    set_subetapas(unique_atributos);
  };

  const group_atributos = (atributos: AtributoEtapa[]): void => {
    const categorias_agrupadas: Record<string, AtributoEtapa[]> = {};

    atributos.forEach(atributo => {
      const categoria = atributo.id_categoria.categoria;
      if (categorias_agrupadas[categoria]) {
        categorias_agrupadas[categoria].push(atributo);
      } else {
        categorias_agrupadas[categoria] = [atributo];
      }
    });

    const nuevo_arreglo = Object.values(categorias_agrupadas);
    set_atributos_etapa(nuevo_arreglo);
  };

  const group_valores_proceso = (valores_proceso: ValoresProceso[]): void => {
    const valores_sorted_by_order: ValoresProceso[] = valores_proceso.sort((valor_proceso1, valor_proceso2) => {
      const valor1_orden: number = valor_proceso1.id_atributo.id_categoria.orden;
      const valor2_orden: number = valor_proceso2.id_atributo.id_categoria.orden;
      if (valor1_orden < valor2_orden) {
        return -1;
      }
      if (valor1_orden > valor2_orden) {
        return 1;
      }
      return 0;
    });

    const categorias_agrupadas: Record<string, ValoresProceso[]> = {};

    valores_sorted_by_order.forEach((valor_proceso) => {
      const categoria = valor_proceso.id_atributo.id_categoria.categoria;
      if (categorias_agrupadas[categoria]) {
        categorias_agrupadas[categoria].push(valor_proceso);
      } else {
        categorias_agrupadas[categoria] = [valor_proceso];
      }
    });

    const nuevo_arreglo = Object.values(categorias_agrupadas);
    set_valores_proceso(nuevo_arreglo);
  };

  const create_new_proceso = (inicio: string, id_etapa: number, id_categoria: number): void => {
    api.post('recaudo/procesos/crear-proceso/', {
      id_funcionario: 1,
      inicio,
      id_cartera: Number(id_cartera),
      id_etapa,
      id_categoria,
    })
      .then((response) => {
        update_procesos_sin_finalizar();
        update_carteras();
        set_position_tab('1');
        set_notification_info({ type: 'success', message: 'Se ha creado correctamente el proceso.' });
        set_open_notification_modal(true);
        // console.log("data retur  crear-proceso", response.data?.id_categoria)
        set_etapa_proceso((prevEtapa: any) => ({
          ...prevEtapa,
          disable: false,
          nuevo_proceso: response.data?.id_categoria,
        }));
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: `Hubo un error.` });
        set_open_notification_modal(true);
      })
  };

  const get_rango_color = (id_cartera: number, dias_mora: number): JSX.Element => {
    const color = carteras.filter(cartera => cartera.id === id_cartera)[0]?.id_rango.color;

    if (color) {
      return <Chip size="small" label={dias_mora} color={color} variant="outlined" />;
    }

    return <></>;
  };

  const filter_by_name = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (filtered_nombres === '' && filtered_apellidos === '' && filtered_identificacion === '') {
      toast.info('Escriba por lo menos los nombres o apellidos o la identificación del deudor', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      api.get(`recaudo/cobros/filtrar-carteras/?nombres=${filtered_nombres}&apellidos=${filtered_apellidos}&identificacion=${filtered_identificacion}`)
        .then((response) => {
          if ((response.data.data as Cartera[]).length > 0) {
            set_carteras(response.data.data);
          } else {
            toast.warning(`No existe el deudor ${filtered_nombres} ${filtered_apellidos}`, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clear_filter = (): void => {
    if (filtered_nombres !== '' || filtered_apellidos !== '' || filtered_identificacion !== '') {
      set_filtered_nombres('');
      set_filtered_apellidos('');
      set_filtered_identificacion('');
      update_carteras();
    }
  };

  const handle_post_valores_sin_archivo = (id_atributo: string, value: string): void => {
    api.post('recaudo/procesos/valores-proceso/', {
      id_proceso: Number(id_proceso),
      id_atributo: Number(id_atributo),
      valor: value,
    })
      .then(() => {
        set_notification_info({ type: 'success', message: `Se ha guardado correctamente el valor "${value}".` });
        set_open_notification_modal(true);
      })
      .catch(() => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: `Hubo un error.` });
        set_open_notification_modal(true);
      });
  };

  const handle_post_valores_con_archivo = (id_atributo: string, value: File): void => {
    api.postForm('recaudo/procesos/valores-proceso/', {
      id_proceso: Number(id_proceso),
      id_atributo: Number(id_atributo),
      documento: value,
    })
      .then(() => {
        set_notification_info({ type: 'success', message: `Se ha guardado correctamente el archivo "${value.name}".` });
        set_open_notification_modal(true);
      })
      .catch(() => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: `Hubo un error.` });
        set_open_notification_modal(true);
      });
  };

  const handle_file_change = (event: React.ChangeEvent<HTMLInputElement>, name: string): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      set_input_files((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
  };

  const handle_pagination_change = (event: React.ChangeEvent<unknown>, value: number): void => {
    set_current_page((value - 1) * 10);
  };
  const [loadingg, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
    unifiedSearchSubmit();
    fetchHistorico();
  }


  const unifiedSearchSubmit = async () => {
      showAlert(
        'Opps...',
        'Esto puede tardar algunos minutos',
        'info'
      );
  };


  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = "/recaudo/configuracion_baisca/cronjop/";
      const res = await api.get(url);
      // const HistoricoData: Historico[] = res.data?.data || [];
      // setHistorico(HistoricoData);
      control_success("Datos actualizados ");
      setLoading(false)
    } catch (error: any) {
      // console.error(error);
      setLoading(false)

      control_error(error.response.data.detail);
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="Proceso de Liquidación"></Title>
          <Box
            sx={{ mt: '20px' }}
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handle_tablist_change}>
                  <Tab label="Gestion Cartera" value="1" />
                  <Tab label="Editar Cartera" value="2" disabled={is_from_liquidacion || !datos}/>
                  {cobro_persuasivo_active && <Tab label="Proceso cobro Persuasivo" value="3" disabled={false}/>}
                  {cobro_coactivo_active && <Tab label="Proceso Cobro Coactivo" value="4" disabled={false}/>}
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Box
                  component={'form'}
                  onSubmit={filter_by_name}
                  display={'flex'}
                  gap={2}
                  sx={{ mb: '20px' }}
                >
                  <TextField
                    label='Nombres'
                    size='small'
                    value={filtered_nombres}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      set_filtered_nombres(event.target.value);
                    }}
                  />
                  <TextField
                    label='Apellidos'
                    size='small'
                    value={filtered_apellidos}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      set_filtered_apellidos(event.target.value);
                    }}
                  />
                  <TextField
                    label='Identificación'
                    size='small'
                    value={filtered_identificacion}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      set_filtered_identificacion(event.target.value);
                    }}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    startIcon={<SearchIcon />}
                    sx={{ height: 'fit-content' }}
                  >
                    Buscar
                  </Button>
                  <Button
                    type='button'
                    variant='outlined'
                    color='primary'
                    startIcon={<ClearIcon />}
                    sx={{ height: 'fit-content' }}
                    onClick={clear_filter}
                  >
                    Limpiar
                  </Button>

                  {/* <Grid item xs={12} sm={4.1}>

                  </Grid> */}

                  <Grid sx={{display: 'flex', justifyContent: 'end', width: '40%'}}>
                    <LoadingButton
                      color="success"
                      onClick={handleClick}
                      loading={loadingg}
                      loadingPosition="start"
                      startIcon={<SettingsInputAntennaIcon />}
                      sx={{ height: 'fit-content' }}
                      variant="contained"
                    >
                      Actualizar base de datos
                    </LoadingButton>
                  </Grid>


                </Box>
                <DataGrid
                  density='standard'
                  autoHeight
                  rows={carteras || []}
                  columns={columns_carteras}
                  pageSize={100}
                  rowsPerPageOptions={[100]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  getRowHeight={() => 'auto'}
                  components={{ Toolbar: GridToolbar }}
                  loading={loading}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        codigo_contable: false,
                        valor_sancion: false,
                      }
                    }
                  }}
                />
                <Stack alignItems={'center'} sx={{ pt: '30px' }}>
                  <Pagination
                    count={Math.ceil(count / 10)}
                    size='large'
                    shape='rounded'
                    color='primary'
                    onChange={handle_pagination_change}
                  />
                </Stack>
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <EditarCartera
                  datos={datos}
                  id_flujo_destino={id_flujo_destino}
                  selected_proceso={selected_proceso}
                  flujos_destino={flujos_destino}
                  id_proceso={id_proceso}
                  id_cartera={id_cartera}
                  id_subetapa_destino={id_subetapa_destino}
                  subetapas={subetapas}
                  handle_select_change={handle_select_change}
                  set_open_requisitos_modal={set_open_requisitos_modal}
                  set_open_create_proceso_modal={set_open_create_proceso_modal}
                  mover_subetapa_actual={mover_subetapa_actual}
                />

              </TabPanel>

              {cobro_persuasivo_active && <TabPanel value="3" sx={{ p: '20px 0' }}>
                  <DocumentoPagoPersuasivo
                    datos={datos}
                  ></DocumentoPagoPersuasivo>
              </TabPanel>}
              {cobro_coactivo_active && <TabPanel value="4" sx={{ p: '20px 0' }}>
                  <ProcesoPagoCoactivo
                    datos={datos}
                  ></ProcesoPagoCoactivo>
              </TabPanel>}
            </TabContext>
          </Box>
        </Grid>
      </Grid>




      {position_tab !== '1' && <SeccionEnvio_MSM_CORREO_F
        selected_proceso={selected_proceso}

      />}




      <TabContext value={position_tab}>
        <TabPanel value="2" sx={{ p: '20px 0' }}>
          {/* <CobroCoactivo
            rows_atributos={atributos_etapa}
            input_values={input_values}
            input_files={input_files}
            valores_proceso={valores_proceso}
            etapa_actual={selected_proceso.etapa}
            handle_input_change={handle_input_change}
            handle_file_change={handle_file_change}
            handle_post_valores_sin_archivo={handle_post_valores_sin_archivo}
            handle_post_valores_con_archivo={handle_post_valores_con_archivo}
          /> */}
        </TabPanel>
      </TabContext>

      <RequisitosModal
        open_requisitos_modal={open_requisitos_modal}
        requisitos={requisitos}
        set_open_requisitos_modal={set_open_requisitos_modal}
        mover_etapa_actual={mover_etapa_actual}
      />

      <NotificationModal
        id_etapa_destino={Number(id_etapa_destino)}
        set_position_tab={set_position_tab}
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />

      <CreateProcesoModal
        open_create_proceso_modal={open_create_proceso_modal}
        set_open_create_proceso_modal={set_open_create_proceso_modal}
        create_new_proceso={create_new_proceso}
      />
    </>
  )
}